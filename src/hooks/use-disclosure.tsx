import { useState } from "react";

export default function useDisclosure(initial: boolean = false): [boolean, () => void] {
    const [state, setState] = useState(initial);

    const toggle = () => setState(prevState => !prevState);

    return [state, toggle];
}
