#include "./source/branches/63x/core/clips.h"


/*
 * test function
 */
extern float float_multiply(float x, float y) {
    return x * y;
}

extern int GetDataType(DATA_OBJECT_PTR ptr)
{
    if (ptr)
    {
        return ptr->type;
    }
    else
    {
        return -1;
    }
}

extern const char *GetDataString(DATA_OBJECT_PTR ptr)
{
    if (ptr)
    {
        if (ptr->type >= 9)
        {
            return "UNK";
        }
        return DOPToString(ptr);
    }
    else
    {
        return "";
    }
}

extern float GetDataNumber(DATA_OBJECT_PTR ptr)
{
    if (ptr)
    {
        if (ptr->type == INTEGER)
        {
            return DOPToInteger(ptr);
        }
        if (ptr->type == FLOAT)
        {
            return DOPToFloat(ptr);
        }
    }
    return -1;
}