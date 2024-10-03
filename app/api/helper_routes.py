from datetime import timedelta

def time_limit_conversion(time_limit):
    if "hours" in time_limit:
        hours=int(time_limit.split("(")[1].split()[0])
        return hours / 24
    else:
        days = int(time_limit.split("(")[1].split()[0])
        return days
