import styles from './Footer.module.css';

function Footer() {
    return (
        <footer className={styles.footer}>
            <div className="is-flex">
                <p className="has-text-grey small-tex">
                    EthGlobal 2024
                    {' '}
                </p>
                <img
                    src="Footer-heart.png"
                    width="25px"
                    height="25px"
                    alt="Footer"
                    className="ml-2"
                />
            </div>
        </footer>
    );
}

export default Footer;
