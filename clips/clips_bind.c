#include "./source/branches/63x/core/clips.h"


static const char *SYMBOLNAMES[] = {
    "FLOAT",
    "INTEGER",
    "SYMBOL",
    "STRING",
    "MULTIFIELD",
    "EXTERNAL_ADDRESS",
    "FACT_ADDRESS",
    "INSTANCE_ADDRESS",
    "INSTANCE_NAME"
};

#define SYMBOLNAMES_LEN 9


extern const char *GetDataType(DATA_OBJECT_PTR ptr);

const char *GetDataType(DATA_OBJECT_PTR ptr){
  if(ptr){
      if( ptr->type >= SYMBOLNAMES_LEN){
          return "UNK";
      }
      return SYMBOLNAMES[ ptr->type ];
  }else{
      return "NULL";
  }
}