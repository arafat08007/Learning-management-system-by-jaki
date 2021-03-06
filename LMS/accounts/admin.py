from django.contrib import admin
from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

from .forms import UserAdminCreationForm, UserAdminChangeForm
from .models.email_activation import EmailActivation

User = get_user_model()


# Register your models here.
class UserAdmin(admin.ModelAdmin):
    form = UserAdminChangeForm
    add_form = UserAdminCreationForm

    list_display = ('email', 'admin')
    list_filter = ('admin', 'staff', 'is_active')
    list_filter = ('admin', 'is_student', 'is_active')
    list_filter = ('admin', 'is_teacher', 'is_active')
    list_filter = ('admin', 'is_management', 'is_active')

    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal Info', {'fields': ('first_name', 'last_name', 'image', 'about')}),
        ('Permissions', {'fields': ('admin', 'staff', 'is_active', 'is_student', 'is_teacher', 'is_management')}),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2')}
         ),
    )

    search_fields = ['email', 'first_name', 'last_name']
    ordering = ('email',)
    filter_horizontal = ()


class EmailActivationAdmin(admin.ModelAdmin):
    search_fields = ['email']

    class Meta:
        model: EmailActivation


admin.site.register(User, UserAdmin)
admin.site.register(EmailActivation, EmailActivationAdmin)
