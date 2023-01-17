import { Modes } from "../Modes"
import { FaMinus, FaPlus } from "react-icons/fa"
import styles from "../styles/Nav.module.css"

export const Nav = ({ mode, setMode, modeNumbers, setModeNumbers }) => {
    return (
        <nav className={styles.nav}>
            <ul>
                <li>
                    <h1>Mental Math</h1>
                </li>
                <li>
                    <button
                        onClick={() =>
                            setModeNumbers((numbers) =>
                                numbers > 2 ? --numbers : numbers
                            )
                        }
                    >
                        <FaMinus />
                    </button>
                    <span>{modeNumbers}</span>
                    <button
                        onClick={() => setModeNumbers((numbers) => ++numbers)}
                    >
                        <FaPlus />
                    </button>
                    <br />
                    <button
                        className={`${
                            mode == Modes.Addition ? styles.active : ""
                        } ${styles.modeButton}`}
                        onClick={() => setMode(Modes.Addition)}
                    >
                        Addition
                    </button>
                    <button
                        className={`${
                            mode == Modes.Subtraction ? styles.active : ""
                        } ${styles.modeButton}`}
                        onClick={() => setMode(Modes.Subtraction)}
                    >
                        Subtraction
                    </button>
                </li>
            </ul>
        </nav>
    )
}
