import Link from "next/link";

export default function BulkMarkPicker() {
    return (
        <div className="text-xs md:text-base">
            <Link href="/home/mark-multiple-days" className="text-center">Mark Multiple Days</Link>
            {/* <form className="grid">
                <div className="flex">
                    <div>
                        <h3 className="text-center">select from</h3>
                        <select>
                            <option>{1}</option>
                        </select>
                        <select>
                            <option>{"Jan"}</option>
                        </select>
                        <select>
                            <option>{2025}</option>
                        </select>
                    </div>
                    <div>
                        <h3 className="text-center">select to</h3>
                        <select>
                            <option>{1}</option>
                        </select>
                        <select>
                            <option>{"Jan"}</option>
                        </select>
                        <select>
                            <option>{2025}</option>
                        </select>
                    </div>
                </div>
                <button>Mark selected</button>
            </form> */}
        </div>
    );
}
