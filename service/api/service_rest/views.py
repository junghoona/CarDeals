from django.views.decorators.http import require_http_methods
from .models import Technician, Appointment
from django.http import JsonResponse
from .encoders import TechnicianEncoder, AppointmentEncoder
import json


@require_http_methods(["GET", "POST"])
def api_list_technicians(request):
    if request.method == "GET":
        try:
            technicians = Technician.objects.all()
            return JsonResponse(
                {"technicians": technicians},
                encoder=TechnicianEncoder,
                safe=False,
            )
        except Technician.DoesNotExist:
            return JsonResponse(
                {"error": "Employee id # not found"},
                status=404,
            )
    else:  # Handle "POST" request method
        content = json.loads(request.body)
        technician = Technician.objects.create(**content)
        return JsonResponse(
            technician,
            encoder=TechnicianEncoder,
            safe=False,
        )


@require_http_methods(["GET", "DELETE"])
def api_show_technician(request, pk):
    if request.method == "GET":
        try:
            technician = Technician.objects.get(id=pk)
            return JsonResponse(
                technician,
                encoder=TechnicianEncoder,
                safe=False
            )
        except Technician.DoesNotExist:
            return JsonResponse(
                {"error": "Employee id # not found"},
                status=404,
            )
    else:  # Handle "DELETE" request method
        count, _ = Technician.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count > 0})


@require_http_methods(["GET", "POST"])
def api_list_appointments(request):
    if request.method == "GET":
        try:
            appointments = Appointment.objects.all()
            return JsonResponse(
                {"appointments": appointments},
                encoder=AppointmentEncoder,
                safe=False,
            )
        except Appointment.DoesNotExist:
            return JsonResponse(
                {"error": "Appointment does not exist"},
                status=404
            )
    else:  # Handle "POST" request method
        content = json.loads(request.body)
        technician = Technician.objects.get(employee_id=content["technician"])
        content["technician"] = technician
        appointment = Appointment.objects.create(**content)
        return JsonResponse(
            appointment,
            encoder=AppointmentEncoder,
            safe=False,
        )


@require_http_methods(["GET", "DELETE", "PUT"])
def api_show_appointment(request, pk):
    if request.method == "GET":
        try:
            appointment = Appointment.objects.get(id=pk)
            return JsonResponse(
                appointment,
                encoder=AppointmentEncoder,
                safe=False
            )
        except Appointment.DoesNotExist:
            return JsonResponse(
                {"error": "Invalid appointment id #"},
                status=400,
            )
    elif request.method == "DELETE":
        count, _ = Appointment.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count > 0})
    else:  # Handle "PUT" request method
        content = json.loads(request.body)
        try:
            appointment = Appointment.objects.get(id=pk)
            Appointment.objects.filter(id=pk).update(**content)
            return JsonResponse(
                appointment,
                encoder=AppointmentEncoder,
                safe=False
            )
        except Appointment.DoesNotExist:
            return JsonResponse(
                {"error": "Invalid appointment id #"},
                status=400,
            )


@require_http_methods(["PUT"])  # Handle "PUT" request to cancel appointment
def api_cancel_appointment(request, pk):
    if request.method == "PUT":
        try:
            appointment = Appointment.objects.get(id=pk)
            appointment.status = "canceled"
            appointment.save()
            return JsonResponse(
                {"status": "canceled"},
                status=200,
            )
        except Appointment.DoesNotExist:
            return JsonResponse(
                {"error": "Appointment not found"},
                status=404,
            )


@require_http_methods(["PUT"])  # Handle "PUT" request to finish appointment
def api_finish_appointment(request, pk):
    if request.method == "PUT":
        try:
            appointment = Appointment.objects.get(id=pk)
            appointment.status = "finished"
            appointment.save()
            return JsonResponse(
                {"status": "finished"},
                status=200,
            )
        except Appointment.DoesNotExist:
            return JsonResponse(
                {"error": "Appointment not found"},
                status=404,
            )
