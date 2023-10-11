import Link from "next/link";
import { useRouter } from "next/router";
import classes from "./MainHeader.module.scss";

export const MainHeader = () => {
  const router = useRouter();

  return (
    <header className={classes["main-header"]}>
      <div className="container">
        <div className={classes["main-header__content"]}>
          <Link
            href="/"
            className={
              router.pathname === "/"
                ? classes["main-header__title--selected"]
                : classes["main-header__title"]
            }
          >
            Next Events
          </Link>

          <nav>
            <ul className={classes["main-header__list"]}>
              <li>
                <Link
                  href="/events"
                  className={
                    router.pathname === "/events"
                      ? classes["main-header__item--selected"]
                      : classes["main-header__item"]
                  }
                >
                  Browse All Events
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};
