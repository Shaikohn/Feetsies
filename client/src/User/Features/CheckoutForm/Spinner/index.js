import styles from "./index.module.css";

export default function Spinner() {
return (
    <div className={styles.loadingContainer}>
        <div className={styles.loader}>
            <div></div>
        </div>
    </div>
    );
}