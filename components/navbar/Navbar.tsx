import { Search, ShoppingCart } from "lucide-react"

import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group"
import ModeToggle from "../theme/ModeToggle"

export default function Navbar() {
    return (
        <div className="flex justify-evenly items-center m-1 sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b**">
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
            <div className="flex items-center">
                <ShoppingCart/>
                <p>(3)</p>
            </div>
            
            <ModeToggle />
        </div>
    )
}