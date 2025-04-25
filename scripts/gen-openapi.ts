// scripts/gen-openapi.ts
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { fileURLToPath, pathToFileURL } from 'url';
import path from 'path';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function generate() {
  // costruisci il file URL per app.module.ts
  const modulePath = path.join(__dirname, '../packages/apps/backend/src/app.module.ts');
  const moduleUrl = pathToFileURL(modulePath).href;

  // importa dinamicamente usando file:// URL
  const { AppModule } = await import(moduleUrl);

  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder().setTitle('Prenota-Azione API').setVersion('1.0.0').build();
  const document = SwaggerModule.createDocument(app, config);

  const outDir = path.join(__dirname, '../openapi-spec');
  if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });
  writeFileSync(path.join(outDir, 'api.json'), JSON.stringify(document, null, 2));
  await app.close();

  console.log('✅ Spec OpenAPI generato in openapi-spec/api.json');
}

generate().catch((err) => {
  console.error(err);
  process.exit(1);
});
