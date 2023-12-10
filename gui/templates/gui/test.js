{% load static %}
import moment from "{% static 'moment/dist/moment.js' %}"

console.log(moment.now())