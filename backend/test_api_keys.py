#!/usr/bin/env python3
"""
Simple test script to verify API keys are working
"""

import os
from dotenv import load_dotenv
import openai
import httpx
import asyncio

# Load environment variables
load_dotenv()

def test_env_loading():
    """Test if environment variables are loaded correctly"""
    print("🔍 Testing Environment Variable Loading...")
    
    openai_key = os.getenv("OPENAI_API_KEY")
    sealion_key = os.getenv("SEALION_API_KEY")
    sealion_url = os.getenv("SEALION_BASE_URL")
    
    print(f"OPENAI_API_KEY: {'✅ Found' if openai_key else '❌ Missing'}")
    if openai_key:
        print(f"  Length: {len(openai_key)} characters")
        print(f"  Starts with: {openai_key[:10]}...")
        print(f"  Ends with: ...{openai_key[-10:]}")
    
    print(f"SEALION_API_KEY: {'✅ Found' if sealion_key else '❌ Missing'}")
    if sealion_key:
        print(f"  Length: {len(sealion_key)} characters")
        print(f"  Starts with: {sealion_key[:10]}...")
    
    print(f"SEALION_BASE_URL: {'✅ Found' if sealion_url else '❌ Missing'}")
    if sealion_url:
        print(f"  URL: {sealion_url}")
    
    return openai_key, sealion_key, sealion_url

def test_openai_key(api_key):
    """Test OpenAI API key"""
    print("\n🤖 Testing OpenAI API Key...")
    
    if not api_key:
        print("❌ No OpenAI API key found")
        return False
    
    try:
        client = openai.OpenAI(api_key=api_key)
        
        # Test with a simple completion
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": "Say 'API test successful'"}],
            max_tokens=10
        )
        
        print("✅ OpenAI API key is valid!")
        print(f"   Response: {response.choices[0].message.content}")
        return True
        
    except openai.AuthenticationError:
        print("❌ OpenAI API key is invalid or expired")
        return False
    except openai.RateLimitError:
        print("⚠️  OpenAI API rate limit exceeded (but key is valid)")
        return True
    except Exception as e:
        print(f"❌ OpenAI API error: {str(e)}")
        return False

async def test_sealion_key(api_key, base_url):
    """Test SEA-LION API key"""
    print("\n🦁 Testing SEA-LION API Key...")
    
    if not api_key or not base_url:
        print("❌ SEA-LION API key or URL missing")
        return False
    
    try:
        async with httpx.AsyncClient() as client:
            # Test with models endpoint first
            response = await client.get(
                f"{base_url}/models",
                headers={"Authorization": f"Bearer {api_key}"},
                timeout=10.0
            )
            
            if response.status_code == 200:
                print("✅ SEA-LION API key is valid!")
                models = response.json()
                if 'data' in models:
                    print(f"   Available models: {len(models['data'])}")
                    for model in models['data'][:2]:  # Show first 2 models
                        print(f"   - {model.get('id', 'Unknown')}")
                return True
            else:
                print(f"❌ SEA-LION API error: {response.status_code}")
                print(f"   Response: {response.text[:200]}")
                return False
                
    except Exception as e:
        print(f"❌ SEA-LION API error: {str(e)}")
        return False

async def test_sealion_chat(api_key, base_url):
    """Test SEA-LION chat completion"""
    print("\n💬 Testing SEA-LION Chat Completion...")
    
    if not api_key or not base_url:
        print("❌ SEA-LION API key or URL missing")
        return False
    
    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"{base_url}/chat/completions",
                headers={
                    "Authorization": f"Bearer {api_key}",
                    "Content-Type": "application/json"
                },
                json={
                    "model": "aisingapore/Llama-SEA-LION-v3-70B-IT",
                    "messages": [
                        {"role": "user", "content": "Say 'SEA-LION API test successful'"}
                    ],
                    "max_completion_tokens": 20
                },
                timeout=30.0
            )
            
            if response.status_code == 200:
                result = response.json()
                print("✅ SEA-LION Chat API is working!")
                print(f"   Response: {result['choices'][0]['message']['content']}")
                return True
            else:
                print(f"❌ SEA-LION Chat API error: {response.status_code}")
                print(f"   Response: {response.text[:200]}")
                return False
                
    except Exception as e:
        print(f"❌ SEA-LION Chat API error: {str(e)}")
        return False

async def main():
    print("🧪 API Keys Test Script")
    print("=" * 40)
    
    # Test environment loading
    openai_key, sealion_key, sealion_url = test_env_loading()
    
    # Test OpenAI
    openai_works = test_openai_key(openai_key)
    
    # Test SEA-LION
    sealion_works = await test_sealion_key(sealion_key, sealion_url)
    
    # Test SEA-LION chat if basic test passed
    if sealion_works:
        await test_sealion_chat(sealion_key, sealion_url)
    
    print("\n" + "=" * 40)
    print("📊 Test Summary:")
    print(f"OpenAI API: {'✅ Working' if openai_works else '❌ Failed'}")
    print(f"SEA-LION API: {'✅ Working' if sealion_works else '❌ Failed'}")
    
    if openai_works and sealion_works:
        print("\n🎉 All API keys are working! You can start the FastAPI server.")
    else:
        print("\n⚠️  Some API keys have issues. Check the errors above.")

if __name__ == "__main__":
    asyncio.run(main())
