from pydantic import BaseModel, Field


class SkillCreate(BaseModel):
    name: str = Field(min_length=2, max_length=50)
    category: str = Field(min_length=2, max_length=30)
    progress: int = Field(ge=0, le=100)
    status: str


class Skill(SkillCreate):
    id: int
