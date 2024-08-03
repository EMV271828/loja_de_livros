import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat)

const DataValida = (data: string) => {

    const novaDataArray = data.split("/")

    const novaData = `${novaDataArray[2]}-${novaDataArray[1]}-${novaDataArray[0]}`

    return dayjs(novaData, "YYYY-MM-DD", true).isValid()
}

export default DataValida;