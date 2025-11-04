import DayMarkPicker, { DayMarkOption } from "../header/markPicker/DayMarkPicker";
import ActionSelectRadio from "../../base/radioGroup/ActionSelectRadio";
import ActionSettings from "./ActionSettings";
import SelectionOptions from "../../base/radioGroup/SelectionOptions";
import { DayActions, DayActionsQuantity } from "@/app/(frontend)/store/slices/actionsOptions/actionsOptionsSlice";

type Props = {
    markOptions: DayMarkOption[] | null;
};

export default function MarkOptionsBar({ markOptions }: Props) {
    // ssr options...
    const actionRadioValues = [DayActions.MARK, DayActions.CLEAR, DayActions.SEE_DETAILS];
    const actionsQuantityRadioValues = [DayActionsQuantity.SINGLE, DayActionsQuantity.RANGE];

    const actionsRadioOptions = actionRadioValues.map((value) => {
        return {
            option: <ActionSelectRadio label={value} name="dayActions" value={value} />,
            value,
        };
    });

    const actionsQuantityRadioOptions = actionsQuantityRadioValues.map((value) => {
        return {
            option: <ActionSelectRadio label={value} name="dayActionsQuantity" value={value} />,
            value,
        };
    });

    return (
        <div className="bg-red-800/65 inset-shadow-[0_0_10px_3px_black] flex justify-around items-center py-5 items-center ">
            <DayMarkPicker markOptions={markOptions} />
            <SelectionOptions optionsSet={[actionsRadioOptions, actionsQuantityRadioOptions]} />
            <ActionSettings label={"Overwrite"} />
        </div>
    );
}
