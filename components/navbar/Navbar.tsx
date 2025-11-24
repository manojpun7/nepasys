import { Search } from "lucide-react"

import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group"
import ModeToggle from "../theme/ModeToggle"

export default function Navbar() {
    return (
        <div className="flex justify-evenly m-3">
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                NEPASYS Assignment !
            </h2>
            <div className="grid w-full max-w-sm gap-6">
                <InputGroup>
                    <InputGroupInput placeholder="Search..." />
                    <InputGroupAddon>
                        <Search />
                    </InputGroupAddon>
                    <InputGroupAddon align="inline-end">12 results</InputGroupAddon>
                </InputGroup>

            </div>
            <ModeToggle />
        </div>
    )
}