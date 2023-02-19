import datetime
from typing import Any, Dict, List
from lib.insta_api import get_most_liked
from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field


description = "Gets the most liked pictures from your Instagram"
app = FastAPI(title="Best Nine from Instagram", description=description)

origins = ["http://localhost:3000", "localhost:3000"]

# setting up CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Picture(BaseModel):
    link: str = Field(..., description="Link to the picture")
    date: datetime.date = Field(..., description="Date of posting")
    title: str = Field(..., description="Title of the post")
    likes: int = Field(..., description="Number of likes")


class BestNine(BaseModel):
    best_nine: List[Picture] = Field(
        ..., description="The 9 most liked picture from the user"
    )


@app.get("/best-nine", response_model=BestNine, tags=["Best Nine"])
def get_best_nine(
    username: str = Query(..., description="Instagram username", example="leojesuz"),
    year: int = Query(
        default=(datetime.datetime.now().year - 1),
    ),
) -> List[Dict[str, Any]]:
    """
    Gets the 9 posts with more likes from the selected user and year,
    sorted by date.\n
    Example: /best-nine?username=leojesuz&year=2022
    """
    posts = get_most_liked(username, year)
    posts = sorted(posts, key=lambda d: d["date"])
    return {"best_nine": posts}
