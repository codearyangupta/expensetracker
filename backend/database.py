import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base



DATABASE_URL = "postgresql://neondb_owner:npg_0Um5nevoDqXI@ep-shy-pine-adzlx26v.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require"

engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

Base = declarative_base()
