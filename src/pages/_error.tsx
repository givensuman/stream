// To see this page in dev mode, go to localhost:3000/test/test/test/test/test

import { ErrorProps } from "next/error";
import Link from "next/link"

const Error: React.FC<ErrorProps> = (props) => {
    return (
        <h1>
            Oops! Not sure how you got here.
            <Link href="/">
                <button>
                    Go back Home
                </button>
            </Link>
        </h1>
    )
}

export default Error