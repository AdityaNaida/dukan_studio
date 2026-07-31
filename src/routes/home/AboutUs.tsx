import { NavLink } from "react-router-dom";
import Footer from "@/components/common/Footer";

const VALUES = [
  {
    title: "Honest, not harsh",
    body: "A verdict you can trust has to be one that can say no. Every review is encouraging in tone and unsparing in substance.",
  },
  {
    title: "Specific, not vague",
    body: "Never “make it pop”. Every point lost is named — the shadow, the clutter, the price nobody can read — and every fix is concrete.",
  },
  {
    title: "Fast, not fussy",
    body: "About twenty seconds from upload to verdict, in English, Hindi or Bengali. Fixes you can do with a phone and what's already in the house.",
  },
];

export default function AboutUs() {
  return (
    <div className="dukaan bg-paper text-ink">
      {/* Mission */}
      <section className="mx-auto w-full max-w-6xl px-5 pb-16 pt-14 md:px-8 md:pb-24 md:pt-24">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-soft">
          About PosterPulse
        </p>
        <h1 className="font-display mt-4 max-w-2xl text-[clamp(2rem,6.5vw,3.4rem)] leading-[1.1]">
          Every seller deserves a creative director
          <span className="text-vermilion">.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">
          Big brands never post a creative without someone senior looking at
          it first and saying &#8220;not this one.&#8221; Everyone else posts
          their first draft — and loses the scroll to brands with budgets.
        </p>
        <p className="mt-4 max-w-2xl leading-relaxed text-ink-soft">
          PosterPulse gives that second pair of eyes to everyone. Upload your
          social-media poster and it reviews the image like a creative
          director: is the product perfectly captured, and will it earn
          engagement in a real feed? You get an honest verdict, a score out
          of 100, and at most three fixes ranked by impact — before your
          audience sees it.
        </p>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {VALUES.map((value) => (
            <article
              key={value.title}
              className="rounded-xl border border-ink/12 bg-paper-raised p-6 shadow-[0_12px_32px_rgba(34,29,24,0.10)]"
            >
              <h2 className="font-display text-lg">{value.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                {value.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* The maker */}
      <section className="border-t border-ink/10 bg-paper-deep/50">
        <div className="mx-auto grid w-full max-w-6xl gap-12 px-5 py-16 md:grid-cols-[0.85fr_1.15fr] md:items-center md:px-8 md:py-24">
          <figure className="mx-auto w-full max-w-[300px] -rotate-2 rounded-md border border-ink/10 bg-paper-raised p-2 pb-4 shadow-[0_18px_44px_rgba(34,29,24,0.2)]">
            <img
              src="/me.webp"
              alt="Aditya Naida"
              className="aspect-square w-full rounded-sm object-cover object-center"
              loading="lazy"
              decoding="async"
            />
            <figcaption className="flex items-center justify-between px-1 pt-3 font-mono text-[9px] uppercase tracking-[0.18em] text-ink-soft">
              <span className="text-leaf">● post it</span>
              <span>the maker</span>
            </figcaption>
          </figure>

          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-vermilion">
              The maker
            </p>
            <p className="mt-5 max-w-lg leading-relaxed text-ink-soft">
              PosterPulse is made by <span className="text-ink">Aditya Naida</span>{" "}
              — CEO at{" "}
              <NavLink
                target="_blank"
                to={"https://www.nextwebflow.com/"}
                className="text-ink underline underline-offset-4"
              >
                Nextwebflow
              </NavLink>{" "}
              and SDE at{" "}
              <NavLink
                target="_blank"
                to={"https://www.yadukaagrotech.com/"}
                className="text-ink underline underline-offset-4"
              >
                Yaduka Agrotech Limited
              </NavLink>
              — who has watched too many good products lose to bad posters.
            </p>

            <div className="mt-7 flex items-center gap-4">
              <NavLink
                to={"https://github.com/AdityaNaida"}
                target="_blank"
                aria-label="Aditya Naida on GitHub"
                className="transition-transform hover:-translate-y-0.5"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 128 128"
                  className="size-7"
                >
                  <g fill="#221d18">
                    <path
                      fillRule="evenodd"
                      d="M64 5.103c-33.347 0-60.388 27.035-60.388 60.388c0 26.682 17.303 49.317 41.297 57.303c3.017.56 4.125-1.31 4.125-2.905c0-1.44-.056-6.197-.082-11.243c-16.8 3.653-20.345-7.125-20.345-7.125c-2.747-6.98-6.705-8.836-6.705-8.836c-5.48-3.748.413-3.67.413-3.67c6.063.425 9.257 6.223 9.257 6.223c5.386 9.23 14.127 6.562 17.573 5.02c.542-3.903 2.107-6.568 3.834-8.076c-13.413-1.525-27.514-6.704-27.514-29.843c0-6.593 2.36-11.98 6.223-16.21c-.628-1.52-2.695-7.662.584-15.98c0 0 5.07-1.623 16.61 6.19C53.7 35 58.867 34.327 64 34.304c5.13.023 10.3.694 15.127 2.033c11.526-7.813 16.59-6.19 16.59-6.19c3.287 8.317 1.22 14.46.593 15.98c3.872 4.23 6.215 9.617 6.215 16.21c0 23.194-14.127 28.3-27.574 29.796c2.167 1.874 4.097 5.55 4.097 11.183c0 8.08-.07 14.583-.07 16.572c0 1.607 1.088 3.49 4.148 2.897c23.98-7.994 41.263-30.622 41.263-57.294C124.388 32.14 97.35 5.104 64 5.104z"
                      clipRule="evenodd"
                    ></path>
                    <path d="M26.484 91.806c-.133.3-.605.39-1.035.185c-.44-.196-.685-.605-.543-.906c.13-.31.603-.395 1.04-.188c.44.197.69.61.537.91zm2.446 2.729c-.287.267-.85.143-1.232-.28c-.396-.42-.47-.983-.177-1.254c.298-.266.844-.14 1.24.28c.394.426.472.984.17 1.255zm2.382 3.477c-.37.258-.976.017-1.35-.52c-.37-.538-.37-1.183.01-1.44c.373-.258.97-.025 1.35.507c.368.545.368 1.19-.01 1.452zm3.261 3.361c-.33.365-1.036.267-1.552-.23c-.527-.487-.674-1.18-.343-1.544c.336-.366 1.045-.264 1.564.23c.527.486.686 1.18.333 1.543zm4.5 1.951c-.147.473-.825.688-1.51.486c-.683-.207-1.13-.76-.99-1.238c.14-.477.823-.7 1.512-.485c.683.206 1.13.756.988 1.237m4.943.361c.017.498-.563.91-1.28.92c-.723.017-1.308-.387-1.315-.877c0-.503.568-.91 1.29-.924c.717-.013 1.306.387 1.306.88zm4.598-.782c.086.485-.413.984-1.126 1.117c-.7.13-1.35-.172-1.44-.653c-.086-.498.422-.997 1.122-1.126c.714-.123 1.354.17 1.444.663zm0 0"></path>
                  </g>
                </svg>
              </NavLink>
              <NavLink
                to={"https://www.linkedin.com/in/aditya-naida/"}
                target="_blank"
                aria-label="Aditya Naida on LinkedIn"
                className="transition-transform hover:-translate-y-0.5"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 256 256"
                  className="size-6"
                >
                  <g fill="none">
                    <rect width={256} height={256} fill="#0a66c2" rx={60}></rect>
                    <path
                      fill="#fff"
                      d="M184.715 217.685h29.27a4 4 0 0 0 4-3.999l.015-61.842c0-32.323-6.965-57.168-44.738-57.168c-14.359-.534-27.9 6.868-35.207 19.228a.32.32 0 0 1-.595-.161V101.66a4 4 0 0 0-4-4h-27.777a4 4 0 0 0-4 4v112.02a4 4 0 0 0 4 4h29.268a4 4 0 0 0 4-4v-55.373c0-15.657 2.97-30.82 22.381-30.82c19.135 0 19.383 17.916 19.383 31.834v54.364a4 4 0 0 0 4 4M38 59.628c0 11.864 9.767 21.626 21.632 21.626c11.862-.001 21.623-9.769 21.623-21.631C81.253 47.761 71.491 38 59.628 38C47.762 38 38 47.763 38 59.627m6.959 158.058h29.307a4 4 0 0 0 4-4V101.66a4 4 0 0 0-4-4H44.959a4 4 0 0 0-4 4v112.025a4 4 0 0 0 4 4"
                    ></path>
                  </g>
                </svg>
              </NavLink>
              <NavLink
                to={"https://x.com/AdityaNaid46542"}
                target="_blank"
                aria-label="Aditya Naida on X"
                className="transition-transform hover:-translate-y-0.5"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 128 128"
                  className="size-5"
                >
                  <path
                    fill="#221d18"
                    d="M75.916 54.2L122.542 0h-11.05L71.008 47.06L38.672 0H1.376l48.898 71.164L1.376 128h11.05L55.18 78.303L89.328 128h37.296L75.913 54.2ZM60.782 71.79l-4.955-7.086l-39.42-56.386h16.972L65.19 53.824l4.954 7.086l41.353 59.15h-16.97L60.782 71.793Z"
                  ></path>
                </svg>
              </NavLink>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto w-full max-w-6xl px-5 py-16 text-center md:px-8 md:py-20">
        <h2 className="font-display text-[clamp(1.6rem,4.5vw,2.4rem)] leading-tight">
          Got a poster waiting to go out?
        </h2>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <NavLink
            to="/signup"
            className="rounded-full bg-vermilion px-6 py-3 text-sm font-semibold text-paper-raised shadow-[0_10px_24px_rgba(197,48,12,0.3)] transition-transform hover:-translate-y-0.5"
          >
            Review my poster →
          </NavLink>
          <NavLink
            to="/"
            className="rounded-full border border-ink/20 px-6 py-3 text-sm font-semibold transition-colors hover:border-ink/50"
          >
            See how it works
          </NavLink>
        </div>
      </section>

      <Footer />
    </div>
  );
}
