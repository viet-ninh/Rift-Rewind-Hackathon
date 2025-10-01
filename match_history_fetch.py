import requests
import time
import os
import json

API_KEY = "RGAPI-81019d3c-80aa-4630-b073-72c0b1ff2768"
MATCH_REGION = "asia"  # for NA/LAN/BR; use "europe" for EU; "asia" for KR/JP

def get_puuid(gameName, tagLine):
    url = f"https://{MATCH_REGION}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/{gameName}/{tagLine}"
    res = requests.get(url, params={"api_key": API_KEY})
    res.raise_for_status()
    return res.json()["puuid"]

def get_match_ids(puuid, count=100, start=0):
    url = f"https://{MATCH_REGION}.api.riotgames.com/lol/match/v5/matches/by-puuid/{puuid}/ids"
    res = requests.get(url, params={"api_key": API_KEY, "start": start, "count": count})
    res.raise_for_status()
    return res.json()

def get_match_data(match_id):
    url = f"https://{MATCH_REGION}.api.riotgames.com/lol/match/v5/matches/{match_id}"
    res = requests.get(url, params={"api_key": API_KEY})
    res.raise_for_status()
    return res.json()

def save_match_data(match_json, base_folder="matches"):
    # Extract gameName (falls back to "UNKNOWN" if not found)
    game_name = match_json.get("info", {}).get("gameName", "UNKNOWN")

    # Make a folder for this gameName
    folder_path = os.path.join(base_folder, game_name)
    os.makedirs(folder_path, exist_ok=True)

    # Match ID for filename
    match_id = match_json.get("metadata", {}).get("matchId", "unknown_match")
    file_path = os.path.join(folder_path, f"{match_id}.json")

    # Save JSON
    with open(file_path, "w", encoding="utf-8") as f:
        json.dump(match_json, f, indent=2)

    print(f"Saved {match_id} to {file_path}")


# Example usage
if __name__ == "__main__":
    gameName = "Hide on Bush"
    tagLine = "KR1"
    puuid = get_puuid(gameName, tagLine)
    match_ids = get_match_ids(puuid, count=5)  # fetch 5 matches for demo

    for m in match_ids:
        data = get_match_data(m)
        save_match_data(data, base_folder=f"matches/{gameName}#{tagLine}")
        time.sleep(1.5)  # respect Riot API rate limits