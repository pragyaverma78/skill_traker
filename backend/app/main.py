from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from app.schemas import SkillCreate, Skill

app = FastAPI(title="SkillTrack API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

skills: list[Skill] = [
    Skill(id=1, name="React", category="Frontend", progress=70, status="Learning"),
    Skill(id=2, name="FastAPI", category="Backend", progress=45, status="Learning"),
    Skill(id=3, name="Git & GitHub", category="Tools", progress=80, status="Completed"),
]

next_id = 4


@app.get("/")
def root():
    return {"message": "SkillTrack API is running"}


@app.get("/skills", response_model=list[Skill])
def get_skills():
    return skills


@app.post("/skills", response_model=Skill, status_code=201)
def create_skill(skill_data: SkillCreate):
    global next_id

    skill = Skill(id=next_id, **skill_data.model_dump())
    skills.append(skill)
    next_id += 1

    return skill


@app.delete("/skills/{skill_id}")
def delete_skill(skill_id: int):
    for index, skill in enumerate(skills):
        if skill.id == skill_id:
            skills.pop(index)
            return {"message": "Skill deleted successfully"}

    raise HTTPException(status_code=404, detail="Skill not found")


@app.get("/stats")
def get_stats():
    if not skills:
        return {"total_skills": 0, "average_progress": 0, "completed": 0}

    average = round(sum(skill.progress for skill in skills) / len(skills), 1)
    completed = sum(1 for skill in skills if skill.status == "Completed")

    return {
        "total_skills": len(skills),
        "average_progress": average,
        "completed": completed,
    }
