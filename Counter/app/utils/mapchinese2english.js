/**
 * Created by Administrator on 2017/5/5 0005.
 */
export const mapchinese2english={
 "姓名":"_name",
 "性别":"gender",
 "工作单位":"workunit",
 "职务":"profession",
 "手机":"phone",
 "生日":"birth",
 "备注":"memo"
 };
export const mapenglish2chinese={
    "_name":"姓名",
    "gender":"性别",
    "workunit":"工作单位",
    "profession":"职务",
    "phone":"手机",
    "birth":"生日",
    "memo":"备注"
};
export const keyenglish2chinese=(obj)=> {
    let ret = {};
    ret["姓名"] = obj["_name"];
    ret["性别"] = obj["gender"];
    ret["工作单位"] = obj["workunit"];
    ret["职务"] = obj["profession"];
    ret["手机"] = obj["phone"];
    ret["生日"] = obj["birth"];
    ret["备注"] = obj["memo"];
    return ret;
};
export const keychinese2english=(obj)=> {
    let ret = {};
    ret["_name"] = obj["姓名"];
    ret["gender"] = obj["性别"];
    ret["workunit"] = obj["工作单位"];
    ret["profession"] = obj["职务"];
    ret["phone"] = obj["手机"];
    ret["birth"] = obj["生日"];
    ret["memo"] = obj["备注"];
    return ret;
};
export const NewGuid=()=>
{
    let ret="----------------------------7d";
    ret=ret+Math.random().toString(36).substr(2);
    return ret;
};
