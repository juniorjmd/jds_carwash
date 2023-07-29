import { IconName, IconNamesEnum } from "ngx-bootstrap-icons";

export interface Menu {
    text :string ,
    url : string | any[],
    class :string,
    btn_sgv?:IconNamesEnum | IconName,
}
