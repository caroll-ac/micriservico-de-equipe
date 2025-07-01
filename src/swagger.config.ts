import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function swaggerConfig(app: INestApplication) {
  const customCss = `
    body {
      background-color: #121212 !important;
      color: #ffffff !important;
    }

    .swagger-ui .topbar {
      background-color: #1f1f1f !important;
    }

    .swagger-ui .topbar-wrapper .link span {
      color: #ffffff !important;
    }

    .swagger-ui .info {
      color: #ffffff !important;
    }

    .swagger-ui .info hgroup.main h2,
    .swagger-ui .info hgroup.main p,
    .swagger-ui .info .base-url,
    .swagger-ui .info .title,
    .swagger-ui .info .version {
      color: #ffffff !important;
    }

    .swagger-ui .opblock-summary-description,
    .swagger-ui .opblock-description-wrapper,
    .swagger-ui .opblock-section-header,
    .swagger-ui .parameter__name,
    .swagger-ui .response-col_status,
    .swagger-ui .tab,
    .swagger-ui .model-title,
    .swagger-ui .prop-type,
    .swagger-ui .parameter__type {
      color: #ffffff !important;
    }

    .swagger-ui .opblock {
      background-color: #1e1e1e !important;
      border-color: #333 !important;
    }

    .swagger-ui .opblock-tag {
      background-color: #333 !important;
      color: #fff !important;
    }

    .swagger-ui .btn {
      background-color: #333 !important;
      color: #fff !important;
      border: 1px solid #555 !important;
    }

    .swagger-ui input,
    .swagger-ui select,
    .swagger-ui textarea {
      background-color: #1e1e1e !important;
      color: #fff !important;
      border: 1px solid #555 !important;
    }
  `;

  const config = new DocumentBuilder()
    .setTitle('Microserviço de Equipe')
    .setDescription('API para gerenciar equipes')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document, {
    customCss,
  });
}
