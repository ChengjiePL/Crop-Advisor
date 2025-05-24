import requests
import json

def query_azure_openai(crop, num):

    if(num == 1):
        prompt = (
            f"Provide a concise, one-paragraph explanation on the best practices for growing {crop}. "
            "The answer should be direct and plain, without any introductory phrases or extra commentary."
        )
    elif(num == 2):
        prompt = (
            f"Provide a concise, one-paragraph overview of the common problems encountered when cultivating {crop}. "
            f"The answer should be direct and plain, focusing solely on key issues and their solutions, with no extra phrases."
        )
    elif(num == 3):
        prompt = (
            f"Provide a concise, one-paragraph description of the culinary uses of {crop}. "
            f"The answer should be direct and plain, listing the main applications without any introductory or extraneous language."
        )

    api_key = "6evUUU8hO6Z13XrWLqupolcAtbxiOdCiw0LBeu2prfMuqEd33BwUJQQJ99BCACYeBjFXJ3w3AAAAACOGQmQt"
    url = "https://ai-hackathonuabpayretailers082809715538.openai.azure.com/openai/deployments/gpt-4o-mini/chat/completions?api-version=2024-12-01-preview"
    headers = {
        "Content-Type": "application/json",
        "api-key": api_key,
    }
    
    payload = {
        "messages": [
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": prompt}
        ],
        "max_tokens": 150,
        "temperature": 1,
    }
    
    response = requests.post(url, headers=headers, json=payload)
    response.raise_for_status()
    return response.json()["choices"][0]["message"]["content"]
