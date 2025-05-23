import requests
import json
from google.cloud import aiplatform

# Inicialización del cliente
aiplatform.init(
    project="tidy-bliss-459306-g1",
    location="europe-southwest1"   # o la región que prefieras
)
def query_vertex_ai(crop: str, num: int) -> str:
    # Construye el prompt según la opción
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
        raise ValueError("num debe ser 1, 2 o 3")
    
    # Invoca el endpoint de chat de Vertex AI
    endpoint = aiplatform.ChatEndpoint(
        endpoint_name="projects/tidy-bliss-459306-g1/locations/europe-southwest1/chatEndpoints/chat-bison"
    )
    response = endpoint.chat(
        # Mensajes en formato chat
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": prompt}
        ],
        temperature=1.0,
        max_output_tokens=150
    )
    
    # Obtiene el contenido de la respuesta
    return response.predictions[0]["content"]

