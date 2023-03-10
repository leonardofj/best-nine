from datetime import datetime
import json
from lib.user_sample import saved_posts
import requests


def get_user_id(username: str) -> str:
    url = (
        f"https://www.instagram.com/api/v1/users/web_profile_info/?username={username}"
    )
    headers = {
        "user-agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 12_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Instagram 105.0.0.11.118 (iPhone11,8; iOS 12_3_1; en_US; en-US; scale=2.00; 828x1792; 165586599)"
    }
    try:
        res = requests.get(url, headers=headers)
        if res.status_code >= 400:
            print(res.text)
            return "1693450027"
        user = res.json()["data"]["user"]
        return user["id"]
    except Exception as e:
        print(e)
        return "1693450027"


def get_user_posts(user_id: str, year: int = 0):
    base_url = "https://www.instagram.com/graphql/query/?query_hash=e769aa130647d2354c40ea6a439bfc08&variables="
    page_size = 100
    variables = {"id": user_id, "first": page_size}
    headers = {
        "user-agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 12_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Instagram 105.0.0.11.118 (iPhone11,8; iOS 12_3_1; en_US; en-US; scale=2.00; 828x1792; 165586599)",
        "x-ig-app-id": "936619743392459",
    }
    file_name = "output_"
    file_count = 1
    while True:
        url = base_url + json.dumps(variables)
        print("url", url)
        res = requests.get(url, headers=headers)
        if res.status_code >= 400:
            print(res.text)
            posts = saved_posts["data"]["user"]["edge_owner_to_timeline_media"]
        else:
            with open(f"{file_name}{file_count}.py", "w") as text_file:
                text_file.write(str(res.json()))
            file_count += 1
            posts = res.json()["data"]["user"]["edge_owner_to_timeline_media"]
        for post in posts["edges"]:
            if year:
                post_date = datetime.utcfromtimestamp(
                    int(post["node"]["taken_at_timestamp"])
                )
                if post_date.year > year:
                    continue
                if post_date.year < year:
                    break
            yield post["node"]
        page_info = posts["page_info"]
        if not page_info["has_next_page"] or post_date.year < year:
            break
        variables["after"] = page_info["end_cursor"]


def get_most_liked(username: str, year: int):
    pics_data = []
    user_id = get_user_id(username)
    for pic in get_user_posts(user_id, year):
        pic_data = {
            "date": datetime.utcfromtimestamp(int(pic["taken_at_timestamp"])),
            "title": pic["edge_media_to_caption"]["edges"][0]["node"]["text"],
            "link": pic["display_url"],
            "likes": pic["edge_media_preview_like"]["count"],
        }
        pics_data.append(pic_data)
    pics_data = sorted(pics_data, key=lambda d: d["likes"], reverse=True)
    return pics_data[:9]
