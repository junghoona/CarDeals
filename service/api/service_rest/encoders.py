from common.json import ModelEncoder
from .models import Technician, Appointment


class TechnicianEncoder(ModelEncoder):
    model = Technician
    properties = [
        "first_name",
        "last_name",
        "employee_id",
    ]


class AppointmentEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "date_time",
        "reason",
        "status",
        "vin",
        "customer",
        "technician",
    ]

    def get_extra_data(self, o):
        return {"technician": o.technician.employee_id}
