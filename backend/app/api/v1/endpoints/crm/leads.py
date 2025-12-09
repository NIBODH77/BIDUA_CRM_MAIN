
from fastapi import APIRouter
from app.api.v1.endpoints import crm_leads

router = crm_leads.router
