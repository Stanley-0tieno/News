from fastapi.testclient import TestClient
from app.main import app

def run_tests():
    with TestClient(app) as client:
        print("Testing Subscribe...")
        res = client.post("/subscriptions/subscribe", json={"email": "test@glotech.com"})
        print("Subscribe response:", res.status_code, res.json())
        assert res.status_code == 200

        print("\nTesting Unsubscribe...")
        res = client.post("/subscriptions/unsubscribe", json={"email": "test@glotech.com"})
        print("Unsubscribe response:", res.status_code, res.json())
        assert res.status_code == 200

if __name__ == "__main__":
    run_tests()
    print("All tests passed.")
