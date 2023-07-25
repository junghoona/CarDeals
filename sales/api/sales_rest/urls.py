from django.urls import path

from .views import (
    api_lst_salespeople,
    api_salesperson,
    api_lst_customers,
    api_customer,
    api_lst_sales,
    api_sale,
)

urlpatterns = [
    path(
        "salespeople/",
        api_lst_salespeople,
        name="api_lst_salespeople",
    ),
    path(
        "salespeople/",
        api_salesperson,
        name="api_salesperson",
    ),
    path(
        "customers/",
        api_lst_customers,
        name="api_lst_customers",
    ),
    path(
        "customers/",
        api_customer,
        name="api_customer",
    ),
    path(
        "sales/",
        api_lst_sales,
        name="api_lst_sales",
    ),
    path(
        "sales/",
        api_sale,
        name="api_sale",
    )
]
