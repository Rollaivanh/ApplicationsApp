

🧩 ApplicationsApp

Status: 🚧 In progress / En desarrollo

ApplicationsApp es una plataforma moderna y robusta para la gestión de postulaciones laborales y seguimiento de entrevistas.
El objetivo del proyecto es centralizar todo el proceso de búsqueda laboral en una única aplicación profesional, intuitiva y escalable.

🚀 Tecnologías principales
Backend

Desarrollado con NestJS, un framework modular, rápido y altamente mantenible.

NestJS – arquitectura limpia y escalable para la API.

Prisma ORM – comunicación segura y eficiente con la base de datos.

PostgreSQL – base de datos relacional, robusta y flexible.

Swagger – documentación automática de endpoints.

JWT (JSON Web Tokens) – autenticación segura de usuarios.

ElevenLabs API – integración de voz mediante inteligencia artificial (Text-to-Speech).

Mail Service (Nodemailer) – envío de correos y notificaciones automáticas.

Metrics Module – procesamiento y análisis de métricas de uso.

Notifications Module – alertas y recordatorios personalizados.

Frontend

La interfaz será desarrollada con:

Next.js (React Framework) – renderizado híbrido (SSR/SSG) y experiencia fluida.

Tailwind CSS – diseño moderno, responsivo y personalizable.

ShadCN/UI Components – componentes reutilizables y accesibles.

Context API / Zustand – manejo global de estado.

Axios / Fetch API – comunicación con el backend.

🧠 Arquitectura

El proyecto sigue una estructura modular clara, facilitando la escalabilidad:

src/
 ├── auth/
 ├── users/
 ├── profiles/
 ├── applications/
 ├── interviews/
 ├── metrics/
 ├── notifications/
 ├── eleven-labs/
 ├── mail/
 └── prisma/


Cada módulo cuenta con su propio controlador, servicio y DTOs, permitiendo mantener independencia y reutilización de lógica.

⚙️ Estado actual

✅ Estructura inicial del proyecto creada.

✅ Base de datos configurada y sincronizada con Prisma.

🧩 Módulos principales en desarrollo (auth, users, applications, interviews).

🔄 Integración con ElevenLabs y métricas en proceso.

🚀 Próximamente: interfaz web y conexión completa backend–frontend.

🧰 Requisitos técnicos

Node.js >= 18

PostgreSQL >= 14

npm >= 10

Nest CLI (npm i -g @nestjs/cli)

Prisma CLI (npx prisma)

💡 Visión

ApplicationsApp busca ser una herramienta inteligente y centralizada que acompañe al usuario durante todo el proceso de búsqueda laboral, incluyendo:

Registro y seguimiento de aplicaciones.

Gestión de entrevistas.

Feedback automático con IA.

Métricas personalizadas y sugerencias para mejorar el desempeño.

Simulador de entrevistas con voz (ElevenLabs + OpenAI).

🧾 Licencia

Este proyecto es de código cerrado (uso educativo y demostrativo).
Todos los derechos reservados © 2025.
