# "EmergencIA" - Operador de Emergencia Inteligente

## ***Nunca habia sido tan facil salvar vidas***
Bienvenidos al repositorio oficial del proyecto "EmergencIA" presentado en HackMTY 2023. Este proyecto tiene como objetivo proporcionar una solución innovadora para situaciones de riesgo, mejorando la eficiencia y la precisión en la atención de llamadas de emergencia. 

## Descripción del Proyecto

"EmergencIA" es un operador de emergencia inteligente que utiliza tecnologías de vanguardia para gestionar llamadas de emergencia de manera más eficaz. El sistema se encarga de escuchar al llamador en tiempo real a través de Google Cloud Speech y transcribe la llamada a texto.

### Funcionalidades Clave

1. **Transcripción de Llamadas:** El sistema transcribe las llamadas de emergencia en tiempo real utilizando Google Cloud Speech, convirtiendo la voz del llamador en texto.

2. **Síntesis de Información:** Utilizando HuggingFace, se extraen datos esenciales de la llamada, como el nombre del llamador, una descripción de la situación, la ubicación donde ocurrió el incidente y el tiempo estimado de llegada de la policía desde la estación de Monterrey, calculado a través del API de Google Maps.

3. **Evaluación de Riesgo:** Se utiliza Zero-shot Classification de HuggingFace para determinar el nivel de riesgo de la situación.

4. **Análisis de Emociones:** Se detectan y registran las emociones en la voz del llamador durante la llamada con la ayuda de hume.ai.

5. **Interfaz de Usuario Avanzada:** Los operadores cuentan con una interfaz intuitiva construida con React y componentes de Material UI. En esta interfaz, se muestra una tabla detallada con toda la información mencionada anteriormente para ayudar en la toma de decisiones.

### Tecnologías Utilizadas

- **Backend:** El backend del proyecto se ejecuta en Google Cloud Run.

- **Hosting:** La página web se aloja en Google Firebase y se encuentra disponible en [emergencia.live](https://emergencia.live).

## Instalación

Para ejecutar este proyecto en su entorno local, siga los siguientes pasos:

1. Clonar el repositorio:

```bash
git clone https://github.com/tuusuario/emergencia.git
```

2. Instalar las dependencias del frontend (asegúrese de tener Node.js instalado):

```bash
cd emergencia/frontend
npm install
```

3. Ejecutar la aplicación frontend:

```bash
npm start
```

## Equipo

- Aqui van a ir nuestros nombres / githubs

## Contribuciones

¡Agradecemos las contribuciones de la comunidad! Si desea contribuir a este proyecto, por favor consulte nuestras [pautas de contribución](CONTRIBUTING.md).

## Licencia

Este proyecto está bajo la Licencia MIT. Consulte el archivo [LICENSE](LICENSE) para más detalles.

---

Si tiene alguna pregunta o sugerencia, no dude en contactarnos. ¡Gracias por su interés en "EmergencIA"!

![EmergencIA Logo](logo.png)
