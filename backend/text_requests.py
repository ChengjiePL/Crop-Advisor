import os
from vertexai.generative_models import GenerativeModel
import vertexai

# Configura las credenciales y el proyecto
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = os.path.join(
    os.path.dirname(__file__), "tidy-bliss-459306-g1-31be53d9d08e.json"
)

PROJECT_ID = "tidy-bliss-459306-g1"
LOCATION = "europe-southwest1"  # Cambia esto a us-central1 para Gemini/Google models

# Inicializa Vertex AI (solo es necesario hacerlo una vez al inicio de tu app)
vertexai.init(project=PROJECT_ID, location=LOCATION)


def query_vertex_ai(crop, num):
    if num == 1:
        prompt = (
            f"Provide a concise, one-paragraph explanation on the best practices for growing {crop}. "
            "The answer should be direct and plain, without any introductory phrases or extra commentary."
        )
    elif num == 2:
        prompt = (
            f"Provide a concise, one-paragraph overview of the common problems encountered when cultivating {crop}. "
            "The answer should be direct and plain, focusing solely on key issues and their solutions, with no extra phrases."
        )
    elif num == 3:
        prompt = (
            f"Provide a concise, one-paragraph description of the culinary uses of {crop}. "
            "The answer should be direct and plain, listing the main applications without any introductory or extraneous language."
        )
    else:
        raise ValueError("Invalid 'num' value. Must be 1, 2, or 3.")

    # Crea el modelo Gemini 2.0 Flash
    model = GenerativeModel("gemini-2.0-flash-001")
    # Puedes ajustar los parámetros como temperature y max_output_tokens si lo deseas
    response = model.generate_content(
        prompt,
        generation_config={
            "temperature": 1,
            "max_output_tokens": 150,
        },
    )
    return response.text
