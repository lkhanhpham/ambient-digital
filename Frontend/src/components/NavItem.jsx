const NavItem = ({ text, href, active }) => {

    //   const router = useRouter();
    //   function prefetchPages() {
    //     router.prefetch(router.pathname)

    //   }

    //   const handleClick = event => {
    //     event.preventDefault()
    //     router.push(href)
    //   }

    //   active = router.pathname === href || router.asPath === href
    return (
        <>
            <a
                className={`nav__item ${active ? "active" : ""
                    }`}

            >
                {text}
            </a>

            <style jsx>{`
      a{
        color: #AAADB6;
        text-align: right;
      }
      .nav__item:hover{
        font-weight: bold;
        color:black;
        cursor: pointer;
       }
       .active{
        font-weight: bold;
        color:#fca311;
       }
    `}</style>
        </>

    );
};

export default NavItem;