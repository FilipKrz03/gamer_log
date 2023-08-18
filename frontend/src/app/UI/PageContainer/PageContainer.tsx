import classes from './PageContainer.module.scss';

type Props = {
    children : React.ReactNode
}

const PageContainer = ({children}:Props) => {
    return(
        <div className={classes.container}>
            {children}
        </div>
    )
}

export default PageContainer