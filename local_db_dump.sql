--
-- PostgreSQL database dump
--

-- Dumped from database version 14.13 (Homebrew)
-- Dumped by pg_dump version 14.13 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: actor; Type: TABLE; Schema: public; Owner: myuser
--

CREATE TABLE public.actor (
    id integer NOT NULL,
    name character varying(255),
    country_id integer,
    birth_date date,
    url_photo text
);


ALTER TABLE public.actor OWNER TO myuser;

--
-- Name: actor_id_seq; Type: SEQUENCE; Schema: public; Owner: myuser
--

ALTER TABLE public.actor ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.actor_id_seq
    START WITH 16
    INCREMENT BY 1
    MINVALUE 0
    MAXVALUE 10000000
    CACHE 1
);


--
-- Name: award; Type: TABLE; Schema: public; Owner: myuser
--

CREATE TABLE public.award (
    id integer NOT NULL,
    award character(255),
    year integer,
    country_id integer
);


ALTER TABLE public.award OWNER TO myuser;

--
-- Name: award_id_seq; Type: SEQUENCE; Schema: public; Owner: myuser
--

ALTER TABLE public.award ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.award_id_seq
    START WITH 116
    INCREMENT BY 1
    MINVALUE 0
    MAXVALUE 10000000
    CACHE 1
);


--
-- Name: comments; Type: TABLE; Schema: public; Owner: myuser
--

CREATE TABLE public.comments (
    id integer NOT NULL,
    content character varying(255) NOT NULL,
    rate integer,
    status integer,
    user_id integer NOT NULL,
    drama_id integer NOT NULL
);


ALTER TABLE public.comments OWNER TO myuser;

--
-- Name: comments_id_seq; Type: SEQUENCE; Schema: public; Owner: myuser
--

ALTER TABLE public.comments ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.comments_id_seq
    START WITH 0
    INCREMENT BY 1
    MINVALUE 0
    MAXVALUE 1000000
    CACHE 1
);


--
-- Name: country; Type: TABLE; Schema: public; Owner: myuser
--

CREATE TABLE public.country (
    id integer NOT NULL,
    name character varying(255) DEFAULT NULL::character varying NOT NULL
);


ALTER TABLE public.country OWNER TO myuser;

--
-- Name: country_id_seq; Type: SEQUENCE; Schema: public; Owner: myuser
--

ALTER TABLE public.country ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.country_id_seq
    START WITH 9
    INCREMENT BY 1
    MINVALUE 0
    MAXVALUE 1000000
    CACHE 1
);


--
-- Name: drama; Type: TABLE; Schema: public; Owner: myuser
--

CREATE TABLE public.drama (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    alternative_title character varying(255),
    url_photo text,
    year character varying(100),
    synopsis text,
    availability character varying(255),
    link_trailer text,
    status integer,
    created_by character varying(255),
    country_id integer,
    genres character varying(255),
    actors character varying(255)
);


ALTER TABLE public.drama OWNER TO myuser;

--
-- Name: drama_actor; Type: TABLE; Schema: public; Owner: myuser
--

CREATE TABLE public.drama_actor (
    drama_id integer NOT NULL,
    actor_id integer NOT NULL
);


ALTER TABLE public.drama_actor OWNER TO myuser;

--
-- Name: drama_award; Type: TABLE; Schema: public; Owner: myuser
--

CREATE TABLE public.drama_award (
    drama_id integer NOT NULL,
    award_id integer NOT NULL
);


ALTER TABLE public.drama_award OWNER TO myuser;

--
-- Name: drama_genre; Type: TABLE; Schema: public; Owner: myuser
--

CREATE TABLE public.drama_genre (
    drama_id integer NOT NULL,
    genre_id integer NOT NULL
);


ALTER TABLE public.drama_genre OWNER TO myuser;

--
-- Name: dramas_id_seq; Type: SEQUENCE; Schema: public; Owner: myuser
--

CREATE SEQUENCE public.dramas_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.dramas_id_seq OWNER TO myuser;

--
-- Name: dramas_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: myuser
--

ALTER SEQUENCE public.dramas_id_seq OWNED BY public.drama.id;


--
-- Name: dramav2; Type: TABLE; Schema: public; Owner: myuser
--

CREATE TABLE public.dramav2 (
    id integer NOT NULL,
    title character varying(255),
    alternative_title character varying(255),
    url_photo character varying(255),
    year character varying(50),
    synopsis text,
    availability character varying(255),
    link_trailer character varying(255),
    status integer,
    created_by character varying(255),
    country_id integer,
    actors character varying(255)
);


ALTER TABLE public.dramav2 OWNER TO myuser;

--
-- Name: dramav2_id_seq; Type: SEQUENCE; Schema: public; Owner: myuser
--

ALTER TABLE public.dramav2 ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.dramav2_id_seq
    START WITH 154
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: genre; Type: TABLE; Schema: public; Owner: myuser
--

CREATE TABLE public.genre (
    id integer NOT NULL,
    genre character(255)
);


ALTER TABLE public.genre OWNER TO myuser;

--
-- Name: genrev2; Type: TABLE; Schema: public; Owner: myuser
--

CREATE TABLE public.genrev2 (
    id integer NOT NULL,
    genre_name character varying(255)
);


ALTER TABLE public.genrev2 OWNER TO myuser;

--
-- Name: genrev2_id_seq; Type: SEQUENCE; Schema: public; Owner: myuser
--

ALTER TABLE public.genrev2 ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.genrev2_id_seq
    START WITH 54
    INCREMENT BY 1
    MINVALUE 0
    MAXVALUE 1000000
    CACHE 1
);


--
-- Name: roles; Type: TABLE; Schema: public; Owner: myuser
--

CREATE TABLE public.roles (
    id integer NOT NULL,
    role_name character varying(50) NOT NULL
);


ALTER TABLE public.roles OWNER TO myuser;

--
-- Name: user_watchlist; Type: TABLE; Schema: public; Owner: myuser
--

CREATE TABLE public.user_watchlist (
    user_id integer NOT NULL,
    drama_id integer NOT NULL
);


ALTER TABLE public.user_watchlist OWNER TO myuser;

--
-- Name: users; Type: TABLE; Schema: public; Owner: myuser
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(255) NOT NULL,
    password character varying(255),
    email character varying(255) NOT NULL,
    role_id integer NOT NULL,
    created_at date NOT NULL,
    status character varying(255)
);


ALTER TABLE public.users OWNER TO myuser;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: myuser
--

ALTER TABLE public.users ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: drama id; Type: DEFAULT; Schema: public; Owner: myuser
--

ALTER TABLE ONLY public.drama ALTER COLUMN id SET DEFAULT nextval('public.dramas_id_seq'::regclass);


--
-- Data for Name: actor; Type: TABLE DATA; Schema: public; Owner: myuser
--

COPY public.actor (id, name, country_id, birth_date, url_photo) FROM stdin;
0	Cho Dong-hyuk	0	1978-12-11	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPN12zre-JyDp7tzBEc0yAGhsn4PIinH0thQ&s
1	Wan Lee	0	1984-01-03	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnGQa_YTCcJ-HG-ECTYeRqtFHOlXSSJPUN7Q&s
2	Dylan Minnette	1	1996-12-29	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_3dy0WbcgVlTQIb6hFrhHxLMoTogW_oNZUQ&s
3	Christian Navarro	1	1991-08-21	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHDdZbMpC_Nk8jQuX4OkK98gBAAGjpGGN_fA&s
4	Alisha Boe	1	1997-03-06	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrVHloS7ly8xjfVuR8GQnu6hdunb6VFttYjw&s
5	Brandon Flynn	1	1993-10-11	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_wE4a_YzRj1uCajwIQ88FFl9aXE1Zlx8kHg&s
6	Justin Prentice	1	1994-03-25	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgaHZS9mrjzcxbM1XusK3CSDbSRuIF0U96I06uFt6I5Gjnh0533vxPt0Xd8q6_T6tlfgE&usqp=CAU
7	Joseph Gordon-Levitt	1	1981-02-17	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3EfI7DrSSL7gENaG1KVerOfPGJ4jLPmXR0Q&s
8	Zooey Deschanel	1	1980-01-17	data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMSEhUSExIWFRUXFxoXGBgYFxUVFxoaFxcXFxcZFRgYHSggGBolHRUXIjEhJSkrLi4uGB8zODMsNygtLisBCgoKDg0OGxAQGy0lHSUtKy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tNS0tLTctKy0tLf/AABEIAP0AxwMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAFAAMEBgcBAgj/xAA/EAABAwEEBwYEBAUEAgMAAAABAAIRAwQSITEFBkFRYXGBIpGhscHwBxMy0UJicuEUIzNS8SSCkrIVNJOiwv/EABsBAAIDAQEBAAAAAAAAAAAAAAMEAAECBQYH/8QAKhEAAgICAgIBAwQCAwAAAAAAAAECEQMhEjEEIkEFUWETMnGxQsEjMzT/2gAMAwEAAhEDEQA/AGQrXqA/+a8b2jwP7qqqxajO/wBTzYfRcbA6yI999TjfizX4NCSSXV3DwBxdSSUIJJJQNLaVo2dl+q8NGwZkncApZaVk0uQ3SmnrPZ/6tVrTuzd3DFZxrH8QatUllGaTN4+sjifw8gqLbbS50ucTjtJz6nEobyfYKsddmrW/4n2dhhjHv4iG90lM0vidScf6NQcy0+RlYy542Y95XqhaccJHkqtl1H7G32XX1j57BBnInIQSCT0Kn2bWxsw4s6Hdsxz7li9O0uug/TjnO0f5KVV7XEkuJPPEqcmTgj6Gs1vZVb2SDImOmzesttLYe4fmPmqjo/SlazmaVV7YP0zLe5GLHpoVD2xdccZ/CT6JPy7mlR3fo2SOKcoyfYTAU/QDZtFL9YQ+UR1e/wDZpfrCRh+5HoPIf/FL+H/RqaSSS7588EkkkoQSSSShBJJJKEMYCsGpH/tD9LvJAFYNSB/qR+ly4WH/ALF/J9A+of8Amn/Boi6uLq7p8/EkuShWsWmWWWkXuOJ+kbSYVN0RJt0jxrHp+nZKZc4ycgBmTuHvBYxp3WCpaqjnvPAAZDgPvtXnT2lKloqFz3Ekj/i3O6NyEETwaMvul5T5P8DcYKC/I3aK5yb3/ZC6zoOJk8cVMtVfCAhlYq4mJnkvJ2qWxoa0GZPkoLVJpHA7z4cVoHY460HJdp2mFGe7akFDVhuibwnd7wTrKkGFCstUBuOzp3JfxAJw7vX90OSCwlXZZNH6VLYa8yw4B20bp4cVbtXXf6iifzhZlRrEZHmrXqbpQNq0w4w2+3pj/wBfJKzw7tHa8bz3+m8U+qdM3ZJcaV1dQ80xJJJKEEkkkoQSSSShDGArRqEya7juZ5lVdXL4e08arv0jzK4vjK8qPd/VZ8fFmXRcKRSXaPCHirUDQSTACxbW/TxtNZ7p/lswaOXDafUq8/EjTHyaIpg9qrhxug4+qyK1OnDYD2uY9EvllboawQpcmMkGMczieuxMPfeMNy8/2TVotRJw6enn4KTQow2OnvuQ+gjZBtDPe1DaiO26ndZljtPE4gIK5mC3FgZqxljZTjCScMcYT9OjAncCjmqOixVtVNjhIB7W73KtypWUoNgK12ZzDB2gHvXWM8VcNd9GXaxIEDLzVcqUIjksKdhP06PFnpY4idi8WqgAdrXbNx6qfZaeR98E5pGwktkd24jcrUiOADp1i0qbRtBwLcx3IbUYQYdmEqVUgqNGoy+DfvhhrV/EUvkVHfzGDszm5oGXMeSva+ZNXtJGjVa9ri10yDxX0Tq9pZtqotqtwOThucM0XHO9MDmx07QTSSSRQAl1cXVCHEl1JQhjC0DUShFAu/uce4YLPgtX0FZ/l0KbNoaJ5nE+a5XhRudnr/ruXjgUPuycV5quABO4L0qt8QtNfw1lcQe0cGjicB3TPRdRulZ5GKt0Zlr1pk1bS8gzd7Deh9lVW22q626Nu3ht8Y7kzXqEnHmevrCh2isCSdmQHL2Ur3sdbpUjtB2PcitK1RkeXl6oFTqdqUV1ZshrV2j8I7RO4Aj7hSWjMXegzpuxFlGi0/U4F7uZIjwQJlnlXrW2jNRv6AfMeirrqQaRwJnpCHGTo3KOyMbEbhOzDz/ZXLUGxy2vUjEOZGGPZaHYd6g2exh9le8ZXo/+s+nirP8ADuifl1htvNd3sAjwKpy+DdfJ6150cHUw8DEZ8sDPl4qhGxyMs9u7d74rZHWcPpuYd13pGB7jHQrPadiuVqlmfmQbnGMR4BZsvsq9GhB9+9hRWnSBAnI4HdKi2upcdDs9/LI9692K2NcTSd9L8AdocPpI3blr8mV9gFp6w3Hkbcwd4+6Chs81cNN0S8Q76mdknftDhwMz1KqtXMosXaMONM8DJat8L9YPlua1x7FWGE7n/hPfh1Cyd9Xf1R7U+teFSmD+ZueY2+Sva2U2n6n02kg2qelf4izseT2h2Xcx98D1RpMp2rE3GnQkkklZQkkklCGS6Esvza9Nm9wJ5DErVwNipHw/sUufWIyF0c8z6K8JPwoVDl9zt/XM/PPwXUf7PLjAlYf8WdL/ADbWKTT2aQE/qOPr4rX9YLe2hQqVHZNaT3CfOB1XzZbLQ6rUfUdiXEnvMlGyv4OZhX+REr1omMzPj+2CHucSpVduBO1MOIWURuzlLx2LTtQtCllMvdm+CcNkyG9c1SNVbEKtYXh2Rj9lsWjmQ26Mh/hAyy+A2Jasq2u1qDXjgwT1k+Sp38dLXE4k4D1RPX22h9ZwB/FA/wBoazDq1yF6uaPNptNOjsmXcAIn7dVSVKzTdujU9WdFE6Oux2ngvH6gSR5Qovw/0iG130jgXS2OLT+5WgWGztYxrREAQsu1/sL7Dam2qjg15vCNjhmDzWF9wl3o0y1Uiwh7cRk4cN44jE96rmumgzWpirR/q08WxtGBjwkI9oHTdO10G1mbcxuIzBXnSGkqVnHbMNMxtI+4UZSbsyPSv+qpmo0RUbhUZGIIzMblVG1yDGR2FXnWu00vnfxFkddf+KB2HbceOSp2lqjari9rBTec2bCd7dnRbgVJ/KDVntwqNa4kXgLjxwH0v8weiBaast18gTjsUezV3Md/a4CCDkRuP3Ui01vmNunPmtxXFlN8ogmqyMxHmiWq1YNrAzE4d6hPpuEGDI2Z5b+CkWNobUBiMRh1x6Ir6F6dmyfDu3/Lrvok9moJHAtmPCfBaYFhlgtd2rSqgxlPCMytp0daBUYHbdvNTBL4L8iPUiUupJJgWEkkkoQF6AsPyaDGbYk8ziURSXio7BVGKiqRrJkeSbm+2UH4w2+5ZBTH43gE8gXEeSxeo6G+9v7LRfjJbSalGnODWudHMwP+pWYVql7373JeTuQwtQSHtFsa57A9stc6I37vFd1p0XToVQ2m+WlodG1pkyDuUWnUyI2YjmIjyU/WquKlV1QRNSDG7AesqldmHXEMfD6z3i9w2QB4q16d1gFlYGNxe4E8tnn5IHqXYiaLwDdJiDjuTdr1ZtVV16o4lownAmNmSHJLnsNC+GioVar6lScSTgPferhoLQFWi2+HgOIBPaggbJ8+iGt0BVbUDG9gHOodg3hHaOrrWEseXPgkSXOyjAtjDH3tW0uQNy4vosGibTamGHOMYZ4jCD3K0W2zstVI0qgkEdx3jkqvR0aaAYadSQRL6TiTB/KdhiMFZbC1zS07D4dEtOLTGou1ZRv/ABVt0XUJs5v0nHEZgj0KftFtdaQX1A5rgLpBGWM9mCc8loek2ggHgq5a9EX/AMN6TiAQ0xw4neolbNWUOmTJNOhfIObstu/aoOmdIPfd+dZQ1uV4Axljjs2FaRpDRQqXYaKYAa2IDgLuRGIhQqeinuHyoFwul04kneNkJj0SFuORy/BTNFaustH0vcRuwPcjVp1OptYYmYznbwV20VoWnQbDGgb4XNJtAEofLYZR1RhVvpOa4gk8M01RGIJ70b1qpgPJ4n0PqhNnOMEe94TEloWg97LRY3g0xwmOoWuak22/SbOwXTxgCPfNY3ooR2JwOIPh75LQ9RLVEt3x/wAgYHTEjqg43UxjLG4GmArqZovkAp5PHOOLq8kpKFHkpmucDGadTdQqEMG+LVWbaW/202jni4nz8FSD+LmB4FWf4iybdVnORP8AxVaa0kH37zSz7G3/AKPFMQMd3qVwOv1LxwHvJe3krlmp4rSAvbo0jUmr2ThGIgdFfLKAQs50XFMMeJg4HDfF0zz81fNH15ASuTbsdxLVEm06MY+MB3LxZdCNZAbhtzOPNEaGKmsprMWwkokGz6OAKVoZiAN6IQoD3dqNyjMjtpb2ei8WJoOfMFSHtkKHTfddBUJROfZ27Wg8YXk0m7BHcnqRkYFdqCFLsiRBquhAdN1YY47gUctblWNZLSG0XuJiB6wqT2FapGaayjsgnMuPgIPiq/QfGB6bxyVj088VYuZMwHLaT1lB2WTCfe1NRfqIOPtoM6JqgmN2PMbVddVa12oQdoJ8pjuJ6qg2NpYQd3sq2aMtfy6jHjYQfuO4IDdSTHIrlBo17RNYxdOYw+yIyq/YawBEZESP9uXhCPMdIlPxZzZrZ6SSSWgZ5ITdTJOFeXhQhhPxKsMW8u/vaHeEeip77OQSMvea1b4pWDGk/cC08vfmFn1tpQWu2wB6/dJzdSHY7imDH2WRu38vuoleqALrcvFSLdajkMo5ZIc7etroFLs1fV2uyrYbxj6II3Obu6tU3Vm3ipSa4bfZHfKy6jWdVokfOLDSYeyHOh7Qbwlo/FLiJ74Vy1Gtl8PG2+XdX9o9JLkCcKTYfHkto0yx1USZaBCrtkqwpxrIFtDlJkx9cvPAIfTtTQ7EwdqmUTDQExadHsqHtNBO/b3q0wboJsqtu5oNbLewOuzJ3DEr1/4x7cGvMcT6pyz6PDDx3rdmVQ9Zpug5H3gV7NoJzXTgExUzQ3o1FjdpqYKifEK0EWZwH4i0eIVytQKouvuIYz8ww71vH+4rK/VlBpOc1oGQOM/ZHLEWlse8D9gU1p9glhAG8YRsbh6dE1o8doDZe8EzlVCfjy5qyZVAD44g+B9FOsjzcJ3Een2UO0DEnlHifJOUHwx3MDrklXtD0dM1HQlqv0gRicHN6jLvw7lbNF2gPYCNwPvuWaaj2+WFu1hw5E7eSver1TGo0ZA4DdMmPHwT2OVpCOaNWHUkkkcWOLwV6K8FQoquudk+ZReD+EFw5zl5rG9KnZuy6Lc9P4tLRnBPnPmFh+lmw49QlM69kx7DuFFers3qLVCI2gZhQKoVxYOaDWpdlpvqVGvMTReBgDMjEDcds8E/qbavlVgDk9o7xl6oLYLSabrzcCNvAiCPFSKZIuuBMzgfFalTVAoJxk2bZZIMcQiTbPtVS1P0sK9IY9oK6WOoC1c+ao6MJWgBpHTVSlUFMUSZycSA07gnWWq2uEimIicLp9VM0xZb4ymEJsloqUzdbUcIwAJkAboKJDi1sYhjlJelX+Qmy32z8VCZyMAd+KYq/wAc6SS1g43R5AqcLbVLQTVbvwbj1UC2Wp7zDnEjdkO5EcV8khDJJ1SQMfb7Z835TXNdBhxLcB3ROYVtsVnMC+ZO2MuigaNskGSIRR1SAUGf4B5KTpAy3u7XAYrKtb7dfr3Qcmk9TAHkrzrPpdtCg+qTwA37AO9ZPY6pqVXOeZc4Ek8cPAAeCLij8iuWXwT9IO+a6nuux128s0rMyHH3uXbECJOwHD0jfkpFNoDhJ54HiVMkmy8UEujzaTHf5JUhFEHa52HMSvdWmajw0ZmPE/ZN6XeAbrfpYIHGCAfJDj8Bn9wtqJav5xbscPPD1Wm6qWiXVJzvDy/dY/qxUDKt7YM+i1HUsmHE5mocOg/ZNYnugGdetl9SXGHBcTYgeXFNvOC66omK1XZEz7zUIkQ7bEPecgDjlsMrCNIvvFx3lx73LZNZrZcoPnIiMCMSVh2kbV2zG/HqDl3JbNtocw6TZAtLjeICac3yUmswXsNiZptxxWCmjgYHDCJGIO/gnG/TO7P1TVMQeSlVaZHEHbx2LVmaJ2p1pdTtBuEkQSW7wIy4xK2DRFuDgCDIIWNaqvu2tk7bw8FoALqD5bNw4kbjtIS+WuQbEvUvEXsFGraPDsxPHIqNo3SIfBnFG6LgUHoPGTTtApuiR/c6OifpWBrchjvOKMtaIXioIWn0X+rJ6bIjGQJQvSltDGnGJ8tql6WtrabCSYAVAttpda3EmRSGzK9H/wCfNUjJT9dtMOtFVrRhSaOz+YyRe4jd1USwUIgnM4nkd/NS9K0b9oJjBsDdEblI+VdZiY80dzSjSALHcrY7Roi6QchiT78l4Lr7wG5e8e5NWmuT2BgPeJ4r2whjC7oPUlBoOqHK1pFO8R9TsBwb/hMsAe1o2jHp78whlYOm8ScfJP2N+3aMluqKTtkvRlKKknKfutM1LtUgA53ie8qhU6QgEbcT4D3yRrVfTDRVaMrj897SQHTymVrFOpWbnhc8bpdGz00lxqS6FnJoh/NHPlsQvSmlGUhee8DdgTPBozKgaet5p0y8m6AMBtJ2DhJWYaR0g6o9xJ5nbyE4xwQcmVx6GMeLl2FNaNOutBw7Lcs8ceOzcqc+iBMY7eHRThVaDJEzlIgJm01HVDca2D98oCUtt2xl0lSBziSQBtHjKl06YcBsPvNT32IN7ToEDPZxKFWy1QZAw85nDuHiFpPk6RhqlbG69mLDl72qXYheZdzIMCfBcsdtbUbDtmW+Nyc0e2693Mfse6FJsqCGbGLlqpuyBP7Ge9anTpXmjks1t1DtUzud5k/cLS9D4tAG4EcvvsQc3ww2JVaIj7E5pvMwU+zabqUx/MpucN7Be8BipobipAsoKBzYXiiC7W+lH0Vv/iqfZRq+tL3f0qFQ8XC4PFFKlk5KLWsx4K1OzPFAL+Gq13X7S7sjKm36f929eLc8NYTltjgMgj1azQ3HbgqvrRUimRlJw7wOua0nZdFesVOSXuEiZjPErtrZhecY3DbwgKaHXGNDQC478mzmTvwQa3VCXQDM4lxzOMTwC2vZ2ZekeKtpYzF2exuZJ3uTPzi8weu7lxQ2u2HHfvPon7HJOeI94IzjSsDGVumFjTDmgHYB9lEdTLHXTvjvxBU6yw4cdvvYV40kwnEbP8j3xQ0w7jqwjZ3A04O1p7lCstMipO4kyp1Adh3DDvAT1ks+0obdI63hQ5qjXNVNNi1Ugfxj6h6jgksy0Ja30u0wwQSOi6mMfmcY00L+T9Ac8jljeg3p62/zWsq4NptfUaBiHODS1kjhCoQfdAe6DjgDjJnEnZnCtmlg95L3sgNF1pzkA54ZmJVdtGjajpIIDWz0kwJUeS3RzIx4xBFa0FxJ27cBnw3KdY6opm8c/eXGFEs9LExjB9wvdqs5kAj3j76LMnbotdEa22x1cmcGgjsjHnJ2qBbse/8Ax4ImKMXgdhj9kxZ7LfJ3DxK2pKINxbINjo4SNpj1Pl4onTqi6D7MT903WiQBkPHim61S7A2+yqk+RcVxCFpqCWjgJ5kgrRNVnXqQnNuHKP8AKyGraDemfcLTdSrRLQZz/b7IeVaC43bLc6nkVKpjBNUQSJ2J9qWYZjdVeKdHGYTrxih+nNLss1MvdmfpaM3H7b1aRTRG1gt7KTC57g0Dfv3Ab1lmlNM/xFZoxDQYAnOSMXb43DDmmtYtI1K779R4JOTRMDbAHrtQqw4VA7cfUhNwx0rYtOdukWbSxJpSMBgDs24hNVqcOH6Z81L0ez5tOrSOJm+0/lcB5EFQgXAgOGQu9MfugxfF0wr2gVaaBLp2AY+AXulZpgjP3kpjqYjPMwd+EeiiWe0XTiRifYKPtoD0TWVCCHd/7ohVY17CR9QiQd3DeuWez38RHFem0C14Gz7YnHkMkJhk6JEXWXiPqfHcD9gvdOpIw6YrtekXUhOEY/59V4sMfSTt7ihTVo6Pg5nCRKstMgeKSm06DXD6xPIlJDpndXkw+f6LBrZQaGROOwDHjsWe6TtTnxTbIaO087yFq+sVmp0bPUfA7LS6c565nPxWY2qwfLptcSb1TEk7/qI8U7JUzxUHcaIejKgZJI9SS7Ic4StH9Qb+049Bh5rw2ndLRGIJPWB9123uio2fxNjq4D1I71irdhL+CHWJLRGJce/HAd5Rduj+w1gx2uPFCKVaHN3tEcicPUYorUruc2BIaRnlICqXRF2CLe5lI4Q5+zCQ3jxKCWh0GTnMnf1RW0MiTxw+6E1WSUbGkgU22eKbZditE1EeZDdx8FRbFSlzRG1anqlo35YkiRsO3qhZ2H8dF0otwK6VHs9SN6liqCJSgdkeqYEnICSsf1y026vULgezN1g4A5+vVaNrjpC7ZnwYvdnvBk9wKyahQD3F7jDGZk8cBG88Exhiv3MDkb6RGo6P7Be4xhhPouWSnmOHvyUzSFTAQwsaZi99RzxO5N6PbMHcY7/3TFurANK6CGhbVccATwBnCDm08PJENKYOujAk3mzvEgtI3keKD1KBvYDceR3e9yk6XBLQdoyxOezHmhSim7NxdDpYyqAafZePqYd/5UCtbeEHf9wvQtF6HHB42jbzXajy76s8MffBEjoxLZJ0FbXCW7tm/h73FGzVkEj9PnICq9AFjgRgQcPHNGw4kkxE49ffoqyUXBsL2aqCSJiG5b5/x4pvQhdZbYz51MPpvHZkAjESIKIaKoNa1zn3cjiQZnc2MTmpmjdFVatRtW5DGYtbtO926UJakGb0aNZXNDRAbBGENSXqxUw5oIOGxdTyqhFzaYP13s82R+68yeV9srLddtITWp0wP6YHUmJPcAtr0pZ21KTmOycCO9fPOt16na6rXmXNddn/AGgT3QhTjsvHLRMrwalN4ILXtidkiZHeAmtYm3WUjxGPJg+yD2a2XRcP0k3mn+08tyOWlwr0IP1NJ7yPJDS4vYa7WgbTbf7Wz8Ue+aO1AC2QRkPADPvVZ0e9zTlw8B6ok+1jddkYjl/hZlH22aTtaI9tp7JwGEnqJ75KgVqUAHaR4ewjD+3MbRPr75qVo7RHzXi/gzDrGwePetOSj2RR5EfV7Qxc1zn5ECOsiR3FaRqu+aMH6my1w4iPAgg9QolksbWzAAyHAAQR4FPaFBZVedhAJ/6+gS8p8mMxjUQ0MIjL3mvVNpXumU81uGSE0WmVTXugTZSY+lwPeCPUKjaj2AVn9sS1kujYXmQ08YC1jTmj/n0KlLIuaQOcYeMLMtRavybRUoVBdcTkd4wI9UeD9GgTXvYxrvZoNJ2QJc3uiJ6Sq5RrFpa4cJHLA81qmtehfn0Ht/EO008RP3IWVCznFrsCCf3RsUk40wOWL5Wixsr03MvNy28CMuig2ntCPc7PNQaNZ1PDfhvBUim5xJ7PdJiMiFGqZIuwhbdByxtakBDmhxZukAmEJF0mHGI3n7ojV0jUNMUycBls5IU6hOYmc1bpkVonUKlNn4gf09onlH3XXWy88NyAx3k7uv2Q51RrMoLj3BTW2A0gx7jLntvxnDT9M8TuVcaJy3Ro2pdIVnhzm4AR5YrQqVEDIbIwgdypfw0spNN7zvju+/orzEYZLeJasFll7Hmyti9ukwknmUwEkaOkCbPNqOICyL4vaAIrC0tb2XgXv1AR4jyWu1cXqJpaztqsNN7QQRiCpJWjMXR8zUjBghF7K4NbIPZMXhh4K66V+GlRpL6JaRODMQQOZzKD0dS61QkRdO5wPmgT7oYhX3Az610RAxMzGU7kq9K81rz2Se52SL6X1Tq2ekS4gxGROR3FD9W6Yq2hlOqezlBJEifpB2LFMImhqzUqjCHQQ04TEg8jthW/Qt0ASZAxadnI7lcNJ2FnyWNuNbTaRIyI2CAMDic0PqWOm0AMbn3ZIOa06YbDJSVkOrUF4wcDEwcOnenbI3+bH5QD4iE2dHhgNQgNjERhj6lStG2QgFzpvOx5ZADuA8UKwwaoYxyCkALxSpwE4QrRg9Aqt6yapUrU4VA40qoye2J3470fJhcvLSdFUANG2W1sinVNN4yDgHAmYAnHNTrfqBQrsF83KomHsESNl4GZPFGLDRbUdDpykRebkR+IRjwmUbKbwY1Vv5FPIyu6Rk9u+HFf8DqR3Ey09RBQDSmiK9lNx+Do/DkZ24QSt0hQNJaKpV23ajZ3HaORW5YtaBwy09nzpbQ7MQD+qPA5oe6pvM8vJbjpTUGm8E/MORP0yf3PRZppfRdmpH66jzjgGEd7iQB4rCtdoI2ntMrFmo33Y9TuCsVmLrRWAa3c1ozgCAEMpWYvN0NIG4SSVrHw91X+U35rx2jgPyjAxzVv2dIi9FbLjq7osWeztpjPMneURZnCcI7K834RlGkLNts9g4pLh3lcWzIxSMuKbrYuheqRwJXKAkkqIh2nRIvEuLgcgbsN4NgAxzJXk0huXaLO052OMDMx0EwDxTpGKpotMB6X0QKxa0jsSJGw8+CqGsOqDWVWVqYgFwvRsM9kjwlabCZtNEOaQfeSxKCYSM2gUKT6tlDXHtXRJjExBjHKUOFJ7cg0jiIPWCrOygC27sPEjPlkhhYAY3Ej33JbyY9MP48+0CqVhc5wNQgwZDdnMohToZe5UhoXtjUqkMtnm6ulqdhcctUZsYcxcFKTATjinLHRDjJJwIIgkeXLJXCPKSRWSXGLZNsTCGAOABG4kjPPEDNPOXVxdPpUc5uzgC4urqhQ1VcGtLjMAEmASYG4DE9FR9PapMrF1VpMON6MdsbDkrvWrQ4MjMEzyIC8ELMop9m4yaeio6D1OZTklv8AuOJ6blb6VEMYGjABO0hguVdikYpdElNvse2BNxwxXsHAKNUxdE4LTMocvTx8kl26kqNaP//Z
9	Geoffrey Arend	1	1978-02-28	data:image/jpeg;base64,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
10	Ryan Reynolds	1	1976-10-23	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIPt5KTmiqpQSrXCkQULNp4dnrP9EvmV6kjA&s
11	Melanie Laurent	1	1983-02-21	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlqPeQHK400b_kFtyY8zqBNQ7rQzigcqvMog&s
12	Manuel Garcia Rulfo	1	1981-02-25	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzo73J5tMUo2tZ1tl0HcNqczQxJbr-_R_jrA&s
13	Ranbir Kapoor	7	1982-09-28	https://upload.wikimedia.org/wikipedia/commons/d/d2/Ranbir_Kapoor_promoting_Brahmastra.jpg
14	Anushka Sharma	7	1988-05-01	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlOHSROriEPEk9VZ33lYVVR96fvjabd2_Hbw&s
15	Fawad Khan	7	1981-11-29	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOIC_f3ttiqIA3KDzNQ7GhpYuaeheQdDQmag&s
16	bujang	9	2024-11-11	https://res.cloudinary.com/dg77cnrws/image/upload/v1731295452/rtbqtlyefsbqkhixanse.jpg
17	bujang	7	2024-11-11	https://res.cloudinary.com/dg77cnrws/image/upload/v1731295482/nzo5otqfwp9ihkbikolu.jpg
18	farhan	8	2024-11-09	\N
\.


--
-- Data for Name: award; Type: TABLE DATA; Schema: public; Owner: myuser
--

COPY public.award (id, award, year, country_id) FROM stdin;
1	Baeksang Arts Award for Best Drama                                                                                                                                                                                                                             	2016	0
2	2015 Nominee Golden Trailer Best Fantasy / Adventure Poster                                                                                                                                                                                                    	2015	1
3	2016 Nominee Annie Outstanding Achievement in Animated Effects in a Live Action Production                                                                                                                                                                     	2016	1
4	2018 Nominee Teen Choice Award Choice Movie: Action                                                                                                                                                                                                            	2018	1
5	2014 Winner Teen Choice Award Choice Movie: Breakout Star                                                                                                                                                                                                      	2014	1
6	2016 Winner ASCAP Award Top Box Office Films                                                                                                                                                                                                                   	2016	1
7	2022 Winner Saturn Award Best Streaming Action & Adventure Series                                                                                                                                                                                              	2022	1
8	2020 Winner ReFrame Stamp Top 100 Popular Television (2019-2020)                                                                                                                                                                                               	2020	1
9	2009 Winner National Board of Review Top Ten Film                                                                                                                                                                                                              	2009	1
10	2011 Winner Banff Rockie Award Best Continuing Series                                                                                                                                                                                                          	2011	1
11	2005 Nominee Saturn Award Best Science Fiction Film                                                                                                                                                                                                            	2005	1
12	2022 Indonesian Movie Actors Awards: Film Terfavorit                                                                                                                                                                                                           	2022	2
13	2022 Saturn Awards: Best Streaming Horror & Thriller Series                                                                                                                                                                                                    	2022	1
14	2017 Dragon Awards: Best Science Fiction or Fantasy TV Series                                                                                                                                                                                                  	2017	1
15	2022 Dragon Awards: Best Science Fiction or Fantasy TV Series                                                                                                                                                                                                  	2022	1
16	2021 Asian Academy Creative Awards: Best Visual or Special VFX in TV Series or Feature Film                                                                                                                                                                    	2021	3
17	2022 50th Anniversary Saturn Awards.                                                                                                                                                                                                                           	2022	1
18	2022 Nominee Primetime Emmy. Outstanding Animated Program.                                                                                                                                                                                                     	2022	1
19	2018 Winner Golden Schmoes. Best Comedy of the Year                                                                                                                                                                                                            	2018	1
20	People's Choice Award untuk Serial TV Sci/Fi/Fantasy Favorit                                                                                                                                                                                                   	2021	1
21	Golden Globes USA                                                                                                                                                                                                                                              	2017	1
22	Gold Derby Awards                                                                                                                                                                                                                                              	2020	1
23	Bandung Film Festival for Imported Film                                                                                                                                                                                                                        	2016	1
24	Golden Scythe Horror Awards                                                                                                                                                                                                                                    	2023	1
25	Kids' Choice Award for Favorite Movie Actor                                                                                                                                                                                                                    	2023	1
26	Best Fantasy Film                                                                                                                                                                                                                                              	2001	4
27	Best Foreign Film                                                                                                                                                                                                                                              	2001	4
28	2003 BAFTA: Kids' Vote                                                                                                                                                                                                                                         	2003	4
29	Best Family Film - Live Action                                                                                                                                                                                                                                 	2003	4
30	Grammy Awards · 2018                                                                                                                                                                                                                                           	2018	1
31	2012 Winner Film of Merit                                                                                                                                                                                                                                      	2012	5
32	2012 Winner Hong Kong Film Award                                                                                                                                                                                                                               	2012	5
33	2018 Nominee Critics Choice Award Best Comedy Series                                                                                                                                                                                                           	2018	1
34	2014 Nominee American Comedy Award\nBest Comedy Series                                                                                                                                                                                                          	2014	1
35	2018 Nominee GLAAD Media Award\nOutstanding Comedy Series                                                                                                                                                                                                       	2018	1
36	2014 Nominee Golden Globe\nBest Television Series - Comedy or Musical                                                                                                                                                                                           	2014	1
37	2024 Winner Critics Choice Award Best Drama Series                                                                                                                                                                                                             	2024	1
38	2024 Nominee BAFTA TV Award\nInternational                                                                                                                                                                                                                      	2024	1
39	1993 Winner BSFC Award Best Film                                                                                                                                                                                                                               	1993	1
40	1994 Winner DFWFCA Award\nBest Picture                                                                                                                                                                                                                          	1994	1
41	1994 Winner Golden Globe Best Motion Picture                                                                                                                                                                                                                   	1994	1
42	2022 Nominee Saturn Award Best Science Fiction Film                                                                                                                                                                                                            	2022	1
43	2022 Nominee Critics Choice Award\nBest Picture                                                                                                                                                                                                                 	2022	1
44	2021 Winner FFCC Award Best Visual Effects                                                                                                                                                                                                                     	2021	1
45	2018 Nominee Anime Award (Best Film)                                                                                                                                                                                                                           	2018	3
46	2019 Nominee Annual Award (Anime Movie of The Year)                                                                                                                                                                                                            	2019	3
47	2020 Nominee Annual Award (Anime Movie of The Year)                                                                                                                                                                                                            	2020	3
48	2022 Nominee Annual Award (Anime Movie of The Year)                                                                                                                                                                                                            	2022	3
49	2011 Nominee IGN Award (Best Sci-Fi Movie)                                                                                                                                                                                                                     	2011	1
50	2012 Nominee Golden Trailer (Most Original TV Spot)                                                                                                                                                                                                            	2012	1
51	2003 Annie Award for Outstanding Achievement in an Animated Feature                                                                                                                                                                                            	2003	3
52	2002 Tokyo Anime Award for Animation of The Year                                                                                                                                                                                                               	2002	3
53	2001 Manichi Film Awards for Best Film and Best Animated Film                                                                                                                                                                                                  	2001	3
54	2012 Winner Saturn Award Best DVD Collection                                                                                                                                                                                                                   	2012	1
55	2018 Nominee Anima't Award Best Feature-Length Film                                                                                                                                                                                                            	2018	3
56	2019 Winner Saturn Award Legion M Breakout Director                                                                                                                                                                                                            	2019	1
57	2007 Winner Film Award in Silver Outstanding Feature Film (Programmfüllende Spielfilme)                                                                                                                                                                        	2007	6
58	2015 Winner Empire Award: Best British Film                                                                                                                                                                                                                    	2015	4
59	2018 Winner Empire Award: Best Thriler                                                                                                                                                                                                                         	2018	4
60	2021 Winner ReFrame Stamp IMDbPro Top 200 Most Popular TV Titles 2020-2021                                                                                                                                                                                     	2021	4
61	2018 Nominee Saturn Award: Best Action/Adventure Film                                                                                                                                                                                                          	2018	4
62	1986 Winner Oscar: Best Effects Sound Effects Editing                                                                                                                                                                                                          	1986	1
63	International Indian Film Academy Awards : Best Cinematography                                                                                                                                                                                                 	2016	7
64	International Indian Film Academy Awards : Best Director                                                                                                                                                                                                       	2003	7
65	International Indian Film Academy Awards : Best Dialogue                                                                                                                                                                                                       	2001	7
66	Filmfare Awards : Best Supporting Actress                                                                                                                                                                                                                      	2012	7
67	International Indian Film Academy Awards : Best Film                                                                                                                                                                                                           	2015	7
68	2010 Winner BMI Film Music Award : Film Music\nSteve Jablonsky                                                                                                                                                                                                  	2010	1
69	2011 Winner Hollywood Film Award: Visual Effects of the Year                                                                                                                                                                                                   	2011	1
70	2014 Winner Hollywood Film Award: Visual Effects of the Year                                                                                                                                                                                                   	2014	1
71	2017 Winner Teen Choice Award : Choice: Fight (Bumblebee vs. Nemesis Prime)                                                                                                                                                                                    	2017	1
72	NAACP Image Award for Outstanding Original Score for TV/Film                                                                                                                                                                                                   	2023	1
73	2020 Winner Ruderman Family Foundation Seal of Authentic Representation                                                                                                                                                                                        	2020	1
74	2022 Winner The Joey Awards Vancouver                                                                                                                                                                                                                          	2022	1
75	2024 Nominee Seoul International Drama Awards                                                                                                                                                                                                                  	2024	2
76	2019 Winner Academy Awards USA                                                                                                                                                                                                                                 	2019	1
77	2019 Winner American Cinema Editors USA                                                                                                                                                                                                                        	2019	1
78	2019 Cinema Audio Society USA                                                                                                                                                                                                                                  	2019	1
79	2019 Golden Globes USA                                                                                                                                                                                                                                         	2019	1
80	2019 Motion Picture Sound Editors USA                                                                                                                                                                                                                          	2019	1
81	2023 Winner Family Film Awards                                                                                                                                                                                                                                 	2023	1
82	2024 Kids Choice Awards USA                                                                                                                                                                                                                                    	2024	1
83	Baeksang Arts Awards for Best New Actress                                                                                                                                                                                                                      	2016	0
84	Baeksang Arts Awards for Best Drama (2016)                                                                                                                                                                                                                     	2017	0
85	2013 Winner Hollywood Film Award                                                                                                                                                                                                                               	2013	1
86	2013 Winner Sierra Award                                                                                                                                                                                                                                       	2013	1
87	2007 Winner ASCAP Award                                                                                                                                                                                                                                        	2007	1
88	2006 Winner IFMCA Award                                                                                                                                                                                                                                        	2006	1
89	2006 Winner Golden Schmoes                                                                                                                                                                                                                                     	2006	1
90	2017 Winner ASCAP Award                                                                                                                                                                                                                                        	2017	1
91	2017 Winner Gold Winner                                                                                                                                                                                                                                        	2017	1
92	2016 Winner Canopus Award                                                                                                                                                                                                                                      	2016	1
93	2019 Winner Best Documentary Short Film                                                                                                                                                                                                                        	2019	1
94	2010 Winner Popularity Award                                                                                                                                                                                                                                   	2010	0
95	2013 Winner Top Television Series                                                                                                                                                                                                                              	2013	1
96	2013 Winner Outstanding Color Grading - Television                                                                                                                                                                                                             	2013	1
97	2014 WInner Favorite TV Crime Drama                                                                                                                                                                                                                            	2014	1
98	2015 Winner Favorite TV Crime Drama                                                                                                                                                                                                                            	2015	1
99	2017 Winner Audience Award                                                                                                                                                                                                                                     	2017	1
100	2019 Winner Best International Actrees                                                                                                                                                                                                                         	2019	1
101	2018 Best Adapted Screenplay                                                                                                                                                                                                                                   	2018	1
102	1990 Most Popular Film                                                                                                                                                                                                                                         	1990	3
103	2006 Top Television Series                                                                                                                                                                                                                                     	2006	1
104	2007 Top Television Series                                                                                                                                                                                                                                     	2007	1
105	2008 Top Television Series                                                                                                                                                                                                                                     	2008	1
106	2009 Top Television Series                                                                                                                                                                                                                                     	2009	1
107	2010 Top Television Series                                                                                                                                                                                                                                     	2010	1
108	2011 Top Television Series                                                                                                                                                                                                                                     	2011	1
109	2012 Top Television Series                                                                                                                                                                                                                                     	2012	1
110	2013 Top Television Series                                                                                                                                                                                                                                     	2013	1
111	2004 Nominee MTV Movie Award : Best Movie                                                                                                                                                                                                                      	2004	1
112	2006 Winner Teen Choice Award                                                                                                                                                                                                                                  	2006	1
113	2008 Nominee Blimp Award : Favorite Movie                                                                                                                                                                                                                      	2008	1
114	2013 Nominee People's Choice Award                                                                                                                                                                                                                             	2013	1
115	2017 Nominee Teen Choice Award                                                                                                                                                                                                                                 	2017	1
117	Indonesian Movie Awards                                                                                                                                                                                                                                        	2024	2
\.


--
-- Data for Name: comments; Type: TABLE DATA; Schema: public; Owner: myuser
--

COPY public.comments (id, content, rate, status, user_id, drama_id) FROM stdin;
6	sd	\N	\N	2	11
7	jelek	\N	\N	7	11
8	test	\N	\N	2	12
9	coba	\N	\N	2	12
10	baguss	\N	\N	2	11
11	cobaa	\N	\N	2	11
\.


--
-- Data for Name: country; Type: TABLE DATA; Schema: public; Owner: myuser
--

COPY public.country (id, name) FROM stdin;
0	South Korea
1	United States
2	Indonesia
3	Japan
4	England
5	Taiwan
6	Germany
7	India
8	Thailand
9	Zimbabwe
\.


--
-- Data for Name: drama; Type: TABLE DATA; Schema: public; Owner: myuser
--

COPY public.drama (id, title, alternative_title, url_photo, year, synopsis, availability, link_trailer, status, created_by, country_id, genres, actors) FROM stdin;
0	Crash Landing on You	\N	https://upload.wikimedia.org/wikipedia/id/6/64/Crash_Landing_on_You_main_poster.jpg	2019	The absolute top secret love story of a chaebol heiress who made an emergency landing in North Korea because of a paragliding accident and a North Korean special officer who falls in love with her and who is hiding and protecting her.	Netflix 	https://youtu.be/GVQGWgeVc4k?si=52NMaAQYHKXEtxPT	0	farhan	0	\N	\N
1	The Goblin	\N	https://upload.wikimedia.org/wikipedia/id/6/69/Golbin_Poster.jpg	2021	Former gangster Doo-hyun, known as Goblin, served time for his boss' murder to protect Young-min. Out of prison, Young-min kidnaps Doo-hyun's daughter, forcing him to seek vengeance and reclaim his Goblin persona.	Netflix 	https://youtu.be/vSQ-2incUEM?si=YkoqreKTEvOwRMHz	0	farhan	0	\N	\N
2	Itaewon Class	\N	https://upload.wikimedia.org/wikipedia/id/f/f9/Itaewon_Class_poster.jpg	2020	An ex-con opens a street bar in Itaewon, while also seeking revenge on the family who was responsible for his father's death.	Netflix 	https://youtu.be/NNP8m3gaaFE?si=naxieCcmL1ZoCZjp	0	farhan	0	\N	\N
3	Vincenzo	\N	https://awsimages.detik.net.id/community/media/visual/2021/03/01/vincenzo-1.png	2021	During a visit to his motherland, a Korean-Italian Mafia lawyer gives an unrivaled conglomerate a taste of its own medicine with a side of justice.	Netflix 	https://youtu.be/_J8tYxYB_YU?si=YnLEiQpH7CLVECMW	0	farhan	0	\N	\N
4	Descendants of the Sun	\N	https://upload.wikimedia.org/wikipedia/id/6/6e/DescendantsoftheSun.jpg	2016	This drama tells of the love story that develops between a surgeon and a special forces officer.	Netflix 	https://youtu.be/XyzaMpAVm3s?si=C9-C3laIbJZ3tS6w	0	farhan	0	\N	\N
5	The Maze Runner	\N	https://posters.movieposterdb.com/14_08/2014/1790864/s_1790864_fe41cf34.jpg	2014	Awakening in an elevator, remembering nothing of his past, Thomas emerges into a world of about thirty teenage boys, all without past memories, who have learned to survive under their own set of rules in a completely enclosed environment, subsisting on their own agriculture and supplies. With a new boy arriving every thirty days, the group has been in The Glade for three years, trying to find a way to escape through the Maze that surrounds their living space (patrolled by cyborg monsters named 'Grievers'). They have begun to give up hope when a comatose girl arrives with a strange note, and their world begins to change with the boys dividing into two factions: those willing to risk their lives to escape and those wanting to hang onto what they've got and survive.—KelseyJ	Netflix 	https://youtu.be/AwwbhhjQ9Xk?si=PJjZKZH7amEgeBhA	0	farhan	1	\N	\N
6	The Maze Runner: Scorch Trials	\N	https://posters.movieposterdb.com/15_05/2015/4046784/s_4046784_cbb64415.jpg	2015	The second chapter of the epic Maze Runner saga. Thomas (Dylan O'Brien) and his fellow Gladers face their greatest challenge yet: searching for clues about the mysterious and powerful organization known as WCKD. Their journey takes them to the Scorch, a desolate landscape filled with unimaginable obstacles. Teaming up with resistance fighters, the Gladers take on WCKD's vastly superior forces and uncover its shocking plans for them all.—20th Century Fox	Netflix 	https://youtu.be/-44_igsZtgU?si=7ufXYEqfDzdeZRy2	0	farhan	1	\N	\N
7	Maze Runner: The Death Cure	\N	https://posters.movieposterdb.com/20_06/2018/4500922/s_4500922_2663b144.jpg	2018	In the epic finale to The Maze Runner Saga, Thomas leads his group of escaped Gladers on their final and most dangerous mission yet. To save their friends, they must break into the legendary last city, a WCKD controlled labyrinth that may turn out to be the deadliest maze of all. Anyone who makes it out alive will get the answers to the questions the Gladers have been asking since they first arrived in the maze. Will Thomas and the crew make it out alive? Or will Ava Paige get her way?	Netflix 	https://youtu.be/4-BTxXm8KSg?si=RHS5aQagm2ylIRLq	0	farhan	1	\N	\N
8	Divergent	\N	https://posters.movieposterdb.com/14_03/2014/1840309/s_1840309_2f948395.jpg	2014	In a world divided by factions based on virtues, Tris learns she's Divergent and won't fit in. When she discovers a plot to destroy Divergents, Tris and the mysterious Four must find out what makes Divergents dangerous before it's too late.	Netflix 	https://youtu.be/Aw7Eln_xuWc?si=k4I06AV1XEC1TYzb	0	farhan	1	\N	\N
9	Insurgent	The Divergent Series: Insurgent	https://posters.movieposterdb.com/15_01/2015/2908446/s_2908446_b96edb43.jpg	2015	Beatrice Prior must confront her inner demons and continue her fight against a powerful alliance which threatens to tear her society apart with the help from others on her side.	Netflix 	https://youtu.be/OBn_LRp-D7U?si=PozBNB6ftInKVdDe	0	farhan	1	\N	\N
10	The Boys	\N	https://posters.movieposterdb.com/20_01/2019/1190634/l_1190634_22fcc492.jpg	2019	A group of vigilantes set out to take down corrupt superheroes who abuse their superpowers.	Amazon Prime	https://www.youtube.com/watch?v=5SKP1_F7ReE	0	farhan	1	\N	\N
11	13 Reasons Why	\N	https://posters.movieposterdb.com/21_02/2017/1837492/s_1837492_8fa1eebf.jpg	2017	Follows teenager Clay Jensen, in his quest to uncover the story behind his classmate and crush, Hannah, and her decision to end her life.	Netflix	https://www.youtube.com/watch?v=QkT-HIMSrRk	0	farhan	1	\N	\N
12	500 days of summer	\N	https://posters.movieposterdb.com/09_10/2009/1022603/l_1022603_997c5a61.jpg	2009	After being dumped by the girl he believes to be his soulmate, hopeless romantic Tom Hansen reflects on their relationship to try and figure out where things went wrong and how he can win her back.	Netflix	https://www.youtube.com/watch?v=PsD0NpFSADM	0	farhan	1	\N	\N
13	Sherlock	\N	https://posters.movieposterdb.com/10_08/2010/1475582/l_1475582_6c4d4dac.jpg	2010	The quirky spin on Conan Doyle's iconic sleuth pitches him as a high-functioning sociopath in modern-day London. Assisting him in his investigations: Afghanistan War vet John Watson, who's introduced to Holmes by a mutual acquaintance.	Amazon Prime	https://www.youtube.com/watch?v=gGqWqGOSTGQ	0	farhan	1	\N	\N
14	The Butterfly Effect	\N	https://posters.movieposterdb.com/12_11/2004/289879/s_289879_365cbc14.jpg	2004	Evan Treborn suffers blackouts during significant events of his life. As he grows up, he finds a way to remember these lost memories and a supernatural way to alter his life by reading his journal.	Netiflix	https://www.youtube.com/watch?v=LOS5YgJkjZ0	0	farhan	1	\N	\N
15	Twenty Five Twenty One	Seumuldaseot Seumulhana	https://posters.movieposterdb.com/23_03/2022/17513352/l_twenty-five-twenty-one-movie-poster_83675ed1.jpg	2022	In a time when dreams seem out of reach, a teen fencer pursues big ambitions and meets a hardworking young man who seeks to rebuild his life. At 22 and 18, they say each other's names for the first time, at 25 and 21, they fall in love.	Netflix	https://youtu.be/n7F8o-SoK8s?feature=shared	0	farhan	0	\N	\N
16	Mencuri Raden Saleh	Stealing Raden Saleh	https://posters.movieposterdb.com/23_02/2022/13484872/l_mencuri-raden-saleh-movie-poster_56681bfe.jpg	2022	To save his father, a master forger sets out to steal an invaluable painting with the help of a motley crew of specialists.	Netflix	https://youtu.be/DN3sRz_veBU?feature=shared	0	farhan	2	\N	\N
17	Stranger Things	\N	https://posters.movieposterdb.com/22_12/2016/4574334/l_stranger-things-movie-poster_5e41833a.jpg	2016	In 1980s Indiana, a group of young friends witness supernatural forces and secret government exploits. As they search for answers, the children unravel a series of extraordinary mysteries.	Netflix	https://youtu.be/mnd7sFt5c3A?feature=shared	0	farhan	1	\N	\N
18	Alice in BorderLand	Imawa no Kuni no Arisu	https://posters.movieposterdb.com/23_01/2020/10795658/l_alice-in-borderland-movie-poster_5e9fac9b.jpg	2020	Obsessed gamer Arisu suddenly finds himself in a strange, emptied-out version of Tokyo in which he and his friends must compete in dangerous games in order to survive.	Netflix	https://youtu.be/49_44FFKZ1M?feature=shared	0	farhan	3	\N	\N
19	Moon Knight	\N	https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/D57E6C2B5AC51D335FF7DF86DCA0E76A1AACBC5638033ADF97B28E8E480B011B/scale?width=506&amp;aspectRatio=2.00&amp;format=webp	2022	Steven Grant discovers he's been granted the powers of an Egyptian moon god. But he soon finds out that these newfound powers can be both a blessing and a curse to his troubled life.	Disney+	https://www.youtube.com/watch?v=x7Krla_UxRg	0	farhan	1	\N	\N
20	What If...?	\N	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLXdZZt0GwN7zCAJcnsbbvYM2mvKYlcYwC3Q&s	2021	Exploring pivotal moments from the Marvel Cinematic Universe and turning them on their head, leading the audience into uncharted territory.	Disney+	https://www.youtube.com/watch?v=x9D0uUKJ5KI	0	farhan	1	\N	\N
21	Deadpool 2	\N	https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.marvel.com%2Fmovies%2Fdeadpool-2&psig=AOvVaw2dKlUvctklnBFvnhyfFDAw&ust=1724739856343000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCOC12PCCkogDFQAAAAAdAAAAABAR	2018	Foul-mouthed mutant mercenary Wade Wilson (a.k.a. Deadpool) assembles a team of fellow mutant rogues to protect a young boy with abilities from the brutal, time-traveling cyborg Cable.	Disney+	https://youtu.be/20bpjtCbCz0	0	farhan	1	\N	\N
22	Loki	\N	https://cinemags.org/wp-content/uploads/2021/05/loki-poster.jpg	2021	The mercurial villain Loki resumes his role as the God of Mischief in a new series that takes place after the events of “Avengers: Endgame.”	Disney+	https://www.youtube.com/watch?v=nW948Va-l10	0	farhan	1	\N	\N
23	The Good Doctor	\N	https://m.media-amazon.com/images/M/MV5BNjMwNDNkMzEtNzRmNy00YmExLTg3ZWYtM2NjMjFjNWY3MmM0XkEyXkFqcGdeQXVyMTY0Njc2MTUx._V1_FMjpg_UX1000_.jpg	2017	Shaun Murphy, a young surgeon with autism and savant syndrome, relocates from a quiet country life to join a prestigious hospital surgical unit. Alone in the world and unable to personally connect with those around him, Shaun uses his extraordinary medical gifts to save lives and challenge the skepticism of his colleagues.	Netflix	https://youtu.be/lnY9FWUTY84	0	farhan	1	\N	\N
24	The Outsider	\N	https://m.media-amazon.com/images/M/MV5BNzgxOTc4ODctNDNhZC00M2UzLTgyYzgtM2Q2OTk3NmQ5NTljXkEyXkFqcGdeQXVyMzQ2MDI5NjU@._V1_.jpg	2020	Terry Maitland, a suburban parent, is accused of a grisly murder. Detective Ralph Anderson struggles to solve the bizarre case as he finds some conflicting clues.	HBO	https://www.youtube.com/watch?v=fiVukc-yNFY  	0	farhan	1	\N	\N
25	Moana	\N	https://upload.wikimedia.org/wikipedia/id/thumb/2/26/Moana_Teaser_Poster.jpg/220px-Moana_Teaser_Poster.jpg	2016	Moana, daughter of chief Tui, embarks on a journey to return the heart of goddess Te Fitti from Maui, a demigod, after the plants and the fish on her island start dying due to a blight.	Disney+	https://youtu.be/LKFuXETZUsI	0	farhan	1	\N	\N
26	Five Night At Freddy	\N	https://upload.wikimedia.org/wikipedia/en/thumb/d/d6/Five_Nights_At_Freddy%27s_poster.jpeg/220px-Five_Nights_At_Freddy%27s_poster.jpeg	2023	A troubled security guard begins working at Freddy Fazbear's Pizzeria. While spending his first night on the job, he realizes the late shift at Freddy's won't be so easy to make it through.	Netflix	https://youtu.be/0VH9WCFV6XQ	0	farhan	1	\N	\N
27	Wonka	\N	https://awsimages.detik.net.id/community/media/visual/2023/12/08/film-wonka-2.jpeg?w=600&q=90	2023	Armed with nothing but a hatful of dreams, young chocolatier Willy Wonka manages to change the world, one delectable bite at a time.	Netflix	https://youtu.be/otNh9bTjXWg	0	farhan	1	\N	\N
28	Harry Potter and The Sorcerer’s Stone	\N	https://m.media-amazon.com/images/M/MV5BNmQ0ODBhMjUtNDRhOC00MGQzLTk5MTAtZDliODg5NmU5MjZhXkEyXkFqcGdeQXVyNDUyOTg3Njg@._V1_.jpg	2001	An orphaned boy enrolls in a school of wizardry, where he learns the truth about himself, his family and the terrible evil that haunts the magical world.	Amazon Prime Video, Netflix, Google Play Movies	https://youtu.be/VyHV0BRtdxo?si=N2ih8rFKoiAkckUf	0	farhan	4	\N	\N
29	Harry Potter and The Chamber of Secrets	\N	https://m.media-amazon.com/images/M/MV5BMjE0YjUzNDUtMjc5OS00MTU3LTgxMmUtODhkOThkMzdjNWI4XkEyXkFqcGdeQXVyMTA3MzQ4MTc0._V1_.jpg 	2002	Harry Potter lives his second year at Hogwarts with Ron and Hermione when a message on the wall announces that the legendary Chamber of Secrets has been opened. The trio soon realize that, to save the school, it will take a lot of courage.	Amazon Prime Video, Netflix, Google Play Movies	https://youtu.be/nE11U5iBnH0?si=-CH0iV5bZbi80wrM	0	farhan	4	\N	\N
30	Meitantei Konan Kurogane no Sabumarin	Detective Conan: Black Iron Submarine	https://www.movieposterdb.com/detective-conan-black-iron-submarine-i27521477	2023	Many engineers from around the world gather at the Interpol marine facility Pacific Buoy on Hachijo-jima, in the sea south of central Tokyo Prefecture coast, to witness the launch of a new system that connects all law enforcement camera systems around the world and enables facial recognition worldwide. Conan, along with his friends Kogoro, Ran, Agasa, Haibara, and the Detective Boys, also heads to the island with an invitation from Sonoko to see the whales. He receives a message from Subaru, who says that a Europol agent has been murdered in Germany by Gin. Perturbed, Conan sneaks onto the police ship led by Kuroda, which is bringing them to the island to protect the completion work, and tours the new facility, just in time for the Black Organization to kidnap a female engineer, seeking a piece of important data in her USB drive. A terrifying howl of screws is heard from the ocean as an unknown person approaches Haibara.	Cacthplay	https://www.youtube.com/watch?v=0rNpSmVmN2U	0	farhan	3	\N	\N
31	Meitantei Conan: Halloween no Hanayome	Detective Conan: The Bride of Halloween	https://www.movieposterdb.com/detective-conan-the-bride-of-halloween-i19770970	2022	During the wedding of Takagi and Sato, an assailant breaks and tries to attack Sato. But Takagi protects her while getting injured. The attacker escapes, but the situation is settled, although Sato is rightfully rattled by it all.	Netflix, Bstation	https://www.youtube.com/watch?v=LzCD9wPNd6A	0	farhan	3	\N	\N
56	Succession	\N	https://alternativemovieposters.com/wp-content/uploads/2023/05/Colton-Tisdall_Succession.jpg	2018	The series centers on the Roy family, the owners of global media and entertainment conglomerate Waystar RoyCo, and their fight for control of the company amidst uncertainty about the health of the family's patriarch. Brian Cox portrays the family patriarch Logan Roy.	Max, Prime Video, Hulu, Apple TV, Amazon Prime Video	https://youtu.be/OzYxJV_rmE8?si=7HDytmEz7rZpLteT	0	farhan	1	\N	\N
32	Meitantei Conan: Tokei-jikake no matenrou	Detective Conan: The Time-Bombed Skyscraper	https://www.movieposterdb.com/meitantei-conan-tokei-jikake-no-matenrou-i131479	1997	Detective Shinichi Kudo was once a brilliant teenage detective until he was given a poison that reverted him to a 4 year old. He's taken the name Conan Edogawa so no one (except an eccentric inventor) will know the truth. Now he's got to solve a series of bombings before his loved ones become victims. Who is this madman and why is he doing this. Only the young genius can save the day but will even he be up to the task?	Netflix, Bstation	https://www.youtube.com/watch?v=N4CP6BMyn2s	0	farhan	3	\N	\N
33	Meitantei Conan: 14 banme no target	Detective Conan: The Fourteenth Target	https://www.movieposterdb.com/meitantei-conan-14-banme-no-target-i965649	1998	an’s secret past revealed! Ten years ago, something happened between her mom and dad. Now, plagued by nightmares, Ran is starting to remember… Meanwhile, a murderous card dealer breaks out of jail to seek revenge. His target: Ran’s father. Can Conan stop him in time and save his girlfriend’s family?	Netflix, Bstation	https://www.youtube.com/watch?v=BlJsEmOWQ1E	0	farhan	3	\N	\N
34	Meitantei Conan: Meikyuu no crossroad	Detective Conan: Crossroad in the Ancient Capital	https://www.movieposterdb.com/meitantei-conan-meikyuu-no-crossroad-i1133935	2003	As the police struggle to find a lead, a Kyoto temple seeks the renowned detective Kogorou Mouri's help after receiving a mysterious puzzle. Joined by the young sleuth Conan Edogawa and high school detective Heiji Hattori, they embark on a quest to decipher the riddle, unravel the killer's identity, and confront their shared pasts.	Netflix, Bstation	https://www.youtube.com/watch?v=OEWgyMspNR4	0	farhan	3	\N	\N
35	The Fast and the Furious: Tokyo Drift	\N	https://posters.movieposterdb.com/06_07/2006/0463985/l_121979_0463985_7f210517.jpg	2006	A teenager becomes a major competitor in the world of drift racing after moving in with his father in Tokyo to avoid a jail sentence in America.	Prime Video	https://www.youtube.com/watch?v=p8HQ2JLlc4E	0	farhan	1	\N	\N
36	The Fast and Furious 6	\N	https://posters.movieposterdb.com/13_04/2013/1905041/l_1905041_1f36429c.jpg	2013	Hobbs has Dominic and Brian reassemble their crew to take down a team of mercenaries: Dominic unexpectedly gets convoluted also facing his presumed deceased girlfriend, Letty.	Prime Video	https://www.youtube.com/watch?v=oc_P11PNvRs	0	farhan	1	\N	\N
37	Fast Five	\N	https://posters.movieposterdb.com/11_04/2011/1596343/l_1596343_63064b8e.jpg	2011	Dominic Toretto and his crew of street racers plan a massive heist to buy their freedom while in the sights of a powerful Brazilian drug lord and a dangerous federal agent.	Prime Video	https://www.youtube.com/watch?v=vcn2GOuZCKI	0	farhan	1	\N	\N
38	Furious 7	\N	https://posters.movieposterdb.com/22_05/2009/940657/l_940657_2a184c06.jpg	2015	Deckard Shaw seeks revenge against Dominic Toretto and his family for his comatose brother.	Prime Video	https://www.youtube.com/watch?v=Skpu5HaVkOc	0	farhan	1	\N	\N
39	The Lord of the Rings: The Fellowship of the Ring	\N	lord_of_the_rings_the_fellowship_of_the_ring_2001_advance_original_film_art_50ea31a0-b4d5-489c-89e4-c494a7966b4e_5000x.jpg (1018×1500) (originalfilmart.com)	2001	An ancient Ring thought lost for centuries has been found, and through a strange twist of fate has been given to a small Hobbit named Frodo. When Gandalf discovers the Ring is in fact the One Ring of the Dark Lord Sauron, Frodo must make an epic quest to the Cracks of Doom in order to destroy it. However, he does not go alone. He is joined by Gandalf, Legolas the elf, Gimli the Dwarf, Aragorn, Boromir, and his three Hobbit friends Merry, Pippin, and Samwise. Through mountains, snow, darkness, forests, rivers and plains, facing evil and danger at every corner the Fellowship of the Ring must go. Their quest to destroy the One Ring is the only hope for the end of the Dark Lords reign	Prime Video	https://youtu.be/V75dMMIW2B4?si=FxXoVC24ce1f47mn	0	farhan	1	\N	\N
40	The Lord of the Rings: The Return of the King	\N	LordoftheRingsReturnoftheKing_2003_original_film_art_5000x.webp (2047×3000) (originalfilmart.com)	2003	The final confrontation between the forces of good and evil fighting for control of the future of Middle-earth. Frodo and Sam reach Mordor in their quest to destroy the One Ring, while Aragorn leads the forces of good against Sauron's evil army at the stone city of Minas Tirith.	Prime Video	https://youtu.be/r5X-hFf6Bwo?si=j2t_y_QMMrdJrr5t	0	farhan	1	\N	\N
41	The lord of the rings: The Two Towers	\N	lord_of_the_rings_the_two_towers_2002_original_film_art_5dd21feb-10ab-41a1-84a1-4c4b082e9626_5000x.webp (1357×2000) (originalfilmart.com)	2002	The continuing quest of Frodo and the Fellowship to destroy the One Ring. Frodo and Sam discover they are being followed by the mysterious Gollum. Aragorn, the Elf archer Legolas, and Gimli the Dwarf encounter the besieged Rohan kingdom, whose once great King Theoden has fallen under Saruman's deadly spell	Prime Video	https://youtu.be/LbfMDwc4azU?si=WVpfJHeqh8wUDcmo	0	farhan	1	\N	\N
42	The hobbit: an unexpected journey	\N	latest (2000×3000) (nocookie.net)	2012	Bilbo Baggins is swept into a quest to reclaim the lost Dwarf Kingdom of Erebor from the fearsome dragon Smaug. Approached out of the blue by the wizard Gandalf the Grey, Bilbo finds himself joining a company of thirteen dwarves led by the legendary warrior, Thorin Oakenshield. Their journey will take them into the Wild; through treacherous lands swarming with Goblins and Orcs, deadly Wargs and Giant Spiders, Shapeshifters and Sorcerers. Although their goal lies to the East and the wastelands of the Lonely Mountain first they must escape the goblin tunnels, where Bilbo meets the creature that will change his life forever ... Gollum. Here, alone with Gollum, on the shores of an underground lake, the unassuming Bilbo Baggins not only discovers depths of guile and courage that surprise even him, he also gains possession of Gollum's precious ring that holds unexpected and useful qualities ... A simple, gold ring that is tied to the fate of all Middle-earth in ways Bilbo cannot begin to know.	Prime Video	https://youtu.be/SDnYMbYB-nU?si=67YeVvzNZKEKsOZG	0	farhan	1	\N	\N
43	la la land	\N	uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg (2000×3000) (tmdb.org)	2016	Aspiring actress serves lattes to movie stars in between auditions and jazz musician Sebastian scrapes by playing cocktail-party gigs in dingy bars. But as success mounts, they are faced with decisions that fray the fragile fabric of their love affair, and the dreams they worked so hard to maintain in each other threaten to rip them apart	Netflix	https://youtu.be/0pdqf4P9MB8?si=qVuEeA9xFesBvS35	0	farhan	1	\N	\N
70	I Want to Eat Your Pancreas	Kimi no suizô o tabetai	https://m.media-amazon.com/images/M/MV5BMTQ1ODIzOGQtOGFkZC00MWViLTgyYmUtNWJkNmIxZjYxMTdmXkEyXkFqcGc@._V1_.jpg	2018	A high school student discovers one of his classmates, Sakura Yamauchi, is suffering from a terminal illness. This secret brings the two together, as she lives out her final moments.	Apple TV	https://www.youtube.com/watch?v=HuN15mDKakk	0	farhan	3	\N	\N
71	Hereditary	\N	https://m.media-amazon.com/images/M/MV5BOTU5MDg3OGItZWQ1Ny00ZGVmLTg2YTUtMzBkYzQ1YWIwZjlhXkEyXkFqcGdeQXVyNTAzMTY4MDA@._V1_.jpg	2018	A grieving family is haunted by tragic and disturbing occurrences.	Amazon Prime, Hulu	https://www.youtube.com/watch?v=V6wWKNij_1M	0	farhan	1	\N	\N
44	Overlord I	\N	https://cdn.myanimelist.net/images/anime/7/88019.jpg	2015	The final hour of the popular virtual reality game Yggdrasil has come. However, Momonga, a powerful wizard and master of the dark guild Ainz Ooal Gown, decides to spend his last few moments in the game as the servers begin to shut down. To his surprise, despite the clock having struck midnight, Momonga is still fully conscious as his character and, moreover, the non-player characters appear to have developed personalities of their own! Confronted with this abnormal situation, Momonga commands his loyal servants to help him investigate and take control of this new world, with the hopes of figuring out what has caused this development and if there may be others in the same predicament.	Crunchyroll, Netflix	https://www.youtube.com/embed/3jE9moHQePI?enablejsapi=1&wmode=opaque&autoplay=1	0	farhan	3	\N	\N
45	Overlord II	\N	https://cdn.myanimelist.net/images/anime/1212/113415.jpg	2018	Ainz Ooal Gown, the undead sorcerer formerly known as Momonga, has accepted his place in this new world. Though it bears similarities to his beloved virtual reality game Yggdrasil, it still holds many mysteries which he intends to uncover, by utilizing his power as ruler of the Great Tomb of Nazarick. However, ever since the disastrous brainwashing of one of his subordinates, Ainz has become wary of the impending dangers of the Slane Theocracy, as well as the possible existence of other former Yggdrasil players. Meanwhile, Albedo, Demiurge and the rest of Ainz's loyal guardians set out to prepare for the next step in their campaign: Nazarick's first war… Overlord II picks up immediately after its prequel, continuing the story of Ainz Ooal Gown, his eclectic army of human-hating guardians, and the many hapless humans affected by the Overlord's arrival.	Crunchyroll, Netflix	https://www.youtube.com/embed/p2ksX48PBQY?enablejsapi=1&wmode=opaque&autoplay=1	0	farhan	3	\N	\N
46	Overlord III	\N	https://cdn.myanimelist.net/images/anime/1511/93473.jpg	2018	Following the horrific assault on the Re-Estize capital city, the Guardians of the Great Tomb of Nazarick return home to their master Ainz Ooal Gown. After months of laying the groundwork, they are finally ready to set their plans of world domination into action. As Ainz's war machine gathers strength, the rest of the world keeps moving. The remote Carne Village, which Ainz once saved from certain doom, continues to prosper despite the many threats on its doorstep. And in the northeastern Baharuth Empire, a certain Bloody Emperor sets his sights on the rising power of Nazarick. Blood is shed, heroes fall, and nations rise. Can anyone, or anything, challenge the supreme power of Ainz Ooal Gown?	Crunchyroll, Netflix	https://www.youtube.com/embed/awYU-9jVZxE?enablejsapi=1&wmode=opaque&autoplay=1	0	farhan	3	\N	\N
47	Overlord IV	\N	https://cdn.myanimelist.net/images/anime/1530/120110.jpg	2022	E-Rantel, the capital city of the newly established Sorcerer Kingdom, suffers from a dire shortage of goods. Once a prosperous city known for its trade, it now faces a crisis due to its caution—or even fear—of its king, Ainz Ooal Gown. To make amends, Ainz sends Albedo to the city as a diplomatic envoy. Meanwhile, the cardinals of the Slane Theocracy discuss how to retaliate against Ainz after his attack crippled the Re-Estize Kingdom's army, plotting for the Baharuth Empire to take over the Sorcerer Kingdom. However, when Emperor Jircniv Rune Farlord El Nix arranges a meeting with the Theocracy's messengers at a colosseum, he is confronted by none other than Ainz himself. With their secret gathering now out in the open, the emperor and his guests learn that Ainz has challenged the Warrior King, the empire's greatest fighter, to a duel. With Ainz's motivations beyond his comprehension, Jircniv can do nothing but watch as humanity's future changes before his very eyes.	Crunchyroll, Netflix	https://www.youtube.com/embed/tNYQjEyTO6s?enablejsapi=1&wmode=opaque&autoplay=1	0	farhan	3	\N	\N
48	Overlord: The Sacred Kingdom	Overlord Movie 3: Sei Oukoku-hen	https://cdn.myanimelist.net/images/anime/1954/144101.jpg	2024	The Sacred Kingdom has enjoyed a great many years without war thanks to a colossal wall constructed after a historic tragedy. They understand best how fragile peace can be. When the terrible demon Jaldabaoth takes to the field at the head of a united army of monstrous tribes, the Sacred Kingdom's leaders know their defenses are not enough. With the very existence of the country at stake, the pious have no choice but to seek help wherever they can get it, even if it means breaking taboo and parlaying with the undead king of the Nation of Darkness!	Crunchyroll, Netflix	https://www.youtube.com/embed/vniS5g48wHA?enablejsapi=1&wmode=opaque&autoplay=1	0	farhan	3	\N	\N
49	The SpongeBob SquarePants Movie	\N	https://xl.movieposterdb.com/15_08/2004/345950/xl_345950_4a997ac0.jpg?v=2024-08-25%2022:27:45	2004	SpongeBob takes leave from Bikini Bottom in order to track down, with Patrick, King Neptune's stolen crown.	Netflix	https://youtu.be/47ceXAEr2Oo?si=obQrt5lOPjfWtvCM	0	farhan	1	\N	\N
50	The SpongeBob Movie: Sponge Out of Water	\N	https://xl.movieposterdb.com/14_08/2014/2279373/xl_2279373_fd7068e6.jpg?v=2023-08-25%2020:53:52	2015	When a diabolical pirate above the sea steals the secret Krabby Patty formula, SpongeBob and his friends team up in order to get it back.	Netflix	https://youtu.be/4zoI4L4x1i0?si=yeutQVxsxUtJr_ua	0	farhan	1	\N	\N
51	The SpongeBob Movie: Sponge on the Run	\N	https://xl.movieposterdb.com/21_05/2020/4823776/xl_4823776_ee929659.jpg?v=2024-07-22%2015:50:22	2021	After SpongeBob's beloved pet snail Gary is snail-napped, he and Patrick embark on an epic adventure to the Lost City of Atlantic City to bring Gary home.	Netflix	https://youtu.be/a2cowVH03Xo?si=SqYPcZQc8Tp9DSQO	0	farhan	1	\N	\N
52	Saving Bikini Bottom: The Sandy Cheeks Movie	\N	https://xl.movieposterdb.com/23_03/0/23063732/xl_saving-bikini-bottom-the-sandy-cheeks-movie-movie-poster_da43a426.jpg	2024	When Bikini Bottom is suddenly scooped out of the ocean, Sandy Cheeks and SpongeBob journey to Sandy's home state of Texas, where they meet Sandy's family and must save Bikini Bottom from the hands of an evil CEO.	Netflix	https://youtu.be/Ud6-SGnzH3k?si=c9j26OgFgRx0W_kA	0	farhan	1	\N	\N
53	Mr. Bean's Holiday	\N	https://xl.movieposterdb.com/07_08/2007/453451/xl_453451_781d47f2.jpg?v=2024-07-23%2015:02:08	2007	Mr. Bean wins a trip to Cannes where he unwittingly separates a young boy from his father and must help the two reunite. On the way he discovers France, bicycling, and true love.	Netflix	https://youtu.be/LZfIzJ6XwPQ?si=EKjeOXWGZpuPc54G	0	farhan	1	\N	\N
54	You're the Apple of My Eye	\N	https://upload.wikimedia.org/wikipedia/id/a/aa/You_Are_the_Apple_of_My_Eye_film_poster.jpg	2011	A group of close friends who attend a private school all have a debilitating crush on the sunny star pupil, Shen Jiayi. The only member of the group who claims not to is Ke Jingteng, but he ends up loving her as well.	Netflix	https://youtu.be/v5H6wE47FrI?si=9RdYiil_FUnL09rj	0	farhan	5	\N	\N
55	Modern Family	\N	https://i.ebayimg.com/images/g/QLgAAOSwvLJfPEnL/s-l1600.webp	2009	Three different, but related, families face trials and tribulations in their own uniquely comedic ways.	Netflix	https://youtu.be/Ub_lfN2VMIo?si=MrRO8uzMkUP7R1sM	0	farhan	1	\N	\N
57	Schindler's List	\N	https://i.pinimg.com/564x/e1/42/a5/e142a53687a5d1fcd838f2127d267999.jpg	1993	In Kraków during World War II, the Nazis force local Polish Jews into the overcrowded Kraków Ghetto. Oskar Schindler, a German Nazi Party member from Czechoslovakia, arrives in the city, hoping to make his fortune. He bribes Wehrmacht (German armed forces) and SS officials, acquiring a factory to produce enamelware. Schindler hires Itzhak Stern, a Jewish official with contacts among black marketeers and the Jewish business community; he handles administration and helps Schindler arrange financing. Stern ensures that as many Jewish workers as possible were deemed essential to the German war effort to prevent them from being taken by the SS to concentration camps or killed. Meanwhile, Schindler maintains friendly relations with the Nazis and enjoys his new wealth and status as an industrialist.	Apple TV, Amazon Prime Video, Google Play Movies, Fandango at Home	https://youtu.be/gG22XNhtnoY?si=C16w6rNkL9UXLl9P	0	farhan	1	\N	\N
58	Dune	\N	https://upload.wikimedia.org/wikipedia/id/5/5e/DunePartPost2021.jpg	2021	A mythic and emotionally charged hero's journey, Dune tells the story of Paul Atreides, a brilliant and gifted young man born into a great destiny beyond his understanding, who must travel to the most dangerous planet in the universe to ensure the future of his family and his people.	Netflix, Apple TV, Prime Video	https://youtu.be/n9xhJrPXop4?si=mdFM9kcL4HOuMGS_	0	farhan	1	\N	\N
59	Fate/stay night [Heaven's Feel] I. presage flower	Gekijouban Fate/stay night [Heaven's Feel] I. presage flower	Fate/stay night [Heaven's Feel] I. presage flower (2017) (imdb.com)	2017	Shirou Emiya is a young mage who attends Homurahara Academy in Fuyuki City. One day after cleaning the Archery Dojo in his school, he catches a glimpse of a fight between superhuman beings, and he gets involved in the Holy Grail War, a ritual where mages called Masters fight each other with their Servants in order to win the Holy Grail. Shirou joins the battle to stop an evildoer from winning the Grail and to save innocent people, but everything goes wrong when a mysterious Shadow begins to indiscriminately kill people in Fuyuki.	Crunchyroll, Apple TV, Microsoft Store	https://youtu.be/AMr5pXzpvP0?si=Wrqrp_iXyxIG4dw5	0	farhan	3	\N	\N
60	Fate/stay night [Heaven's Feel] II. lost butterfly	Gekijouban Fate/stay night [Heaven's Feel] II. lost butterfly	Fate/stay night [Heaven's Feel] II. lost butterfly (2019) (imdb.com)	2019	The story focuses on the Holy Grail War and explores the relationship between Shirou Emiya and Sakura Matou, two teenagers participating in this conflict. The story continues immediately from Fate/stay night: Heaven's Feel I. presage flower, following Shirou as he continues to participate in the Holy Grail War even after being eliminated as a master.	Apple TV, Microsoft Store	https://youtu.be/nfzKXkL_i54?si=zm6E1OQ54bidiUnf	0	farhan	3	\N	\N
61	Fate/stay night [Heaven's Feel] III. spring song	Gekijouban Fate/stay night [Heaven's Feel] III. spring song	Fate/stay night [Heaven's Feel] III. spring song (2020) (imdb.com)	2020	The final chapter in the Heaven's Feel trilogy. Angra Mainyu has successfully possessed his vessel Sakura Matou. It's up to Rin, Shirou, and Rider to cleanse the grail or it will be the end of the world and magecraft as we all know it.	Apple TV, Microsoft Store Google Play Movies	https://youtu.be/KlJIMiZfxCY?si=0Lxh1O7xkwxIXi5d	0	farhan	3	\N	\N
62	Real Steel	\N	Real Steel (2011) (imdb.com)	2011	In a near future where robot boxing is a top sport, a struggling ex-boxer feels he's found a champion in a discarded robot.	Netflix, Hotstar, Hulu	https://youtu.be/1VFd5FMbZ64?si=ItKqmKxKBM6r4Whv	0	farhan	1	\N	\N
63	knives out	\N	https://cdn.shopify.com/s/files/1/0057/3728/3618/products/726b1b0e4005ab2219e31b5582e0602a_500x749.jpg?v=1573572660	2019	A detective investigates the death of the patriarch of an eccentric, combative family.	Netflix	Knives Out (2019 Movie) Official Trailer — Daniel Craig, Chris Evans, Jamie Lee Curtis - YouTube	0	farhan	1	\N	\N
64	memento	\N	https://cdn.shopify.com/s/files/1/0057/3728/3618/products/c15059527ae4d9c832dbb365b418369e_7c2bb4af-8bcd-428c-8904-27ddc512a45c_500x749.jpg?v=1573594896	2000	Leonard Shelby, an insurance investigator, suffers from anterograde amnesia and uses notes and tattoos to hunt for the man he thinks killed his wife, which is the last thing he remembers.	Peacock Premium Plus	Memento Original 35 mm Anamorphic Trailer (HD) (CC) - YouTube	0	farhan	1	\N	\N
65	the forest gump	\N	https://cdn.shopify.com/s/files/1/0057/3728/3618/products/forrest-gump---24x36_500x749.jpg?v=1645558337	1994	The history of the United States from the 1950s to the '70s unfolds from the perspective of an Alabama man with an IQ of 75, who yearns to be reunited with his childhood sweetheart.	Netflix	Forrest Gump - Trailer - YouTube	0	farhan	1	\N	\N
66	pulp fiction	\N	https://cdn.shopify.com/s/files/1/0057/3728/3618/products/ab401c136cca10812cda5ac64c3f7c2e_bb5e62f7-b34f-4547-b5c7-495cc2dd1bd9_500x749.jpg?v=1573591339	1994	Jules Winnfield (Samuel L. Jackson) and Vincent Vega (John Travolta) are two hit men who are out to retrieve a suitcase stolen from their employer, mob boss Marsellus Wallace (Ving Rhames). Wallace has also asked Vincent to take his wife Mia (Uma Thurman) out a few days later when Wallace himself will be out of town. Butch Coolidge (Bruce Willis) is an aging boxer who is paid by Wallace to lose his fight. The lives of these seemingly unrelated people are woven together comprising of a series of funny, bizarre and uncalled-for incidents. ??Soumitra	Netflix	Pulp Fiction | Official Trailer (HD) - John Travolta, Uma Thurman, Samuel L. Jackson | MIRAMAX - YouTube	0	farhan	1	\N	\N
67	the prestige	\N	https://www.movieposters.com/cdn/shop/files/prestige.mp.140332_480x.progressive.jpg?v=1709237534	2006	The Prestige (2006) In the end of the nineteenth century, in London, Robert Angier, his beloved wife Julia McCullough, and Alfred Borden are friends and assistants of a magician. When Julia accidentally dies during a performance, Robert blames Alfred for her death, and they become enemies. Both become famous and rival magicians, sabotaging the performance of the other on the stage. When Alfred performs a successful trick, Robert becomes obsessed trying to disclose the secret of his competitor with tragic consequences. ??Claudio Carvalho, Rio de Janeiro, Brazil	Netflix	The Prestige (2006) Trailer #1 | Movieclips Classic Trailers - YouTube	0	farhan	1	\N	\N
68	Spirited Away	Sen to Chihiro no kamikakushi	Spirited Away (2001)	2001	The fanciful adventures of a ten-year-old girl named Chihiro, who discovers a secret world when she and her family get lost and venture through a hillside tunnel. When her parents undergo a mysterious transformation, Chihiro must fend for herself as she encounters strange spirits, assorted creatures and a grumpy sorceress who seeks to prevent her from returning to the human world	Netflix	Spirited Away - Official Trailer	0	farhan	3	\N	\N
69	The Shining	\N	https://m.media-amazon.com/images/M/MV5BZWFlYmY2MGEtZjVkYS00YzU4LTg0YjQtYzY1ZGE3NTA5NGQxXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_FMjpg_UX1000_.jpg	1980	A family heads to an isolated hotel for the winter, where a sinister presence influences the father into violence. At the same time, his psychic son sees horrifying forebodings from both the past and the future.	Amazon Prime	https://www.youtube.com/watch?v=FZQvIJxG9Xs	0	farhan	1	\N	\N
72	Perfume: The Story of a Murderer	\N	https://m.media-amazon.com/images/M/MV5BMTg2Mzk2NjkzNl5BMl5BanBnXkFtZTYwMzIzOTc2._V1_.jpg	2006	Jean-Baptiste Grenouille, born with a superior olfactory sense, creates the world's finest perfume. His work, however, takes a dark turn as he searches for the ultimate scent.	Netflix, Amazon Prime	https://www.youtube.com/watch?v=_-qv0EnGhJU	0	farhan	6	\N	\N
73	Kingsman: The Secret Service	\N	https://a.ltrbxd.com/resized/film-poster/1/4/8/2/0/0/148200-kingsman-the-secret-service-0-1000-0-1500-crop.jpg?v=cd49b739cf	2014	The story of a super-secret spy organization that recruits an unrefined but promising street kid into the agency’s ultra-competitive training program just as a global threat emerges from a twisted tech genius.	Netflix, Amazon US	https://www.youtube.com/watch?v=m4NCribDx4U&pp=ygUba2luZ3NtYW4gdGhlIHNlY3JldCBzZXJ2aWNl	0	farhan	4	\N	\N
74	Kingsman: The Golden Circle	\N	https://a.ltrbxd.com/resized/sm/upload/3h/o6/gc/iy/yOGf8Or1k78Y6OLdYmTTSGHW1dP-0-1000-0-1500-crop.jpg?v=9a2da8212b	2017	When an attack on the Kingsman headquarters takes place and a new villain rises, Eggsy and Merlin are forced to work together with the American agency known as the Statesman to save the world.	Netflix, Amazon US	https://www.youtube.com/watch?v=6Nxc-3WpMbg&pp=ygUaa2luZ3NtYW4gdGhlIGdvbGRlbiBjaXJjbGU%3D	0	farhan	4	\N	\N
75	Behind Her Eyes	\N	https://posters.movieposterdb.com/22_06/2021/9698442/l_9698442_818a3641.jpg	2021	It follows Louise, a single mum with a son and a part-time job in a psychiatrist's office. She begins an affair with her boss and strikes up an unlikely friendship with his wife.	Netflix	https://www.youtube.com/watch?v=c4LtoWQaLxk&pp=ygUXYmVoaW5kIGhlciBleWVzIHRyYWlsZXI%3D	0	farhan	4	\N	\N
76	Baby Driver	\N	https://a.ltrbxd.com/resized/film-poster/2/6/8/9/5/0/268950-baby-driver-0-1000-0-1500-crop.jpg?v=61304ddfc8	2017	After being coerced into working for a crime boss, a young getaway driver finds himself taking part in a heist doomed to fail.	Apple TV, Amazon	https://www.youtube.com/watch?v=zTvJJnoWIPk	0	farhan	4	\N	\N
77	Back to the Future	\N	https://a.ltrbxd.com/resized/film-poster/5/1/9/4/5/51945-back-to-the-future-0-1000-0-1500-crop.jpg?v=6662417358	1985	Eighties teenager Marty McFly is accidentally sent back in time to 1955, inadvertently disrupting his parents’ first meeting and attracting his mother’s romantic interest. Marty must repair the damage to history by rekindling his parents’ romance and - with the help of his eccentric inventor friend Doc Brown - return to 1985.	Amazon Prime	https://www.youtube.com/watch?v=qb7Fd0l_BRo	0	farhan	1	\N	\N
78	Ae Dil Hai Mushkil	\N	https://posters.movieposterdb.com/21_11/2016/4559006/l_4559006_2672b3c1.jpg	2016	Ayan goes on a quest for true love when Alizeh does not reciprocate his feelings. On his journey, he meets different people who make him realize the power of unrequited love.	Netflix, Amazon Prime, Apple TV	https://www.youtube.com/watch?v=Z_PODraXg4E	0	farhan	7	\N	\N
79	Kal Ho Naa Ho	\N	https://posters.movieposterdb.com/12_05/2003/347304/s_347304_e7f7919b.jpg	2003	Naina's neighbor, Aman, introduces her to optimism, and makes her fall in love. But tragedy stopped him from moving forward. In fact, he encouraged his friend Rohit to seduce her.	Netflix, Amazon Prime, Apple TV	https://www.youtube.com/watch?v=tVMAQAsjsOU	0	farhan	7	\N	\N
80	Kabhi Khushi Kabhie Gham	\N	https://posters.movieposterdb.com/10_08/2001/248126/s_248126_0a404d08.jpg	2001	Rahul is sad because his father disapproves of his relationship with the poor Anjali, but still marries her and moves to London. 10 years later, Rahul's younger brother wants to reconcile his father and brother.	Netflix, Amazon Prime, Apple TV	https://www.youtube.com/watch?v=7uY1JbWZKPA	0	farhan	7	\N	\N
81	Jab Tak Hai Jaan	\N	https://posters.movieposterdb.com/12_09/2012/2176013/s_2176013_f513dba4.jpg	2012	Samar Anand is forced to leave his girlfriend, Khushi (Katrina Kaif). From London, he returns to Kashmir leaving his past behind, and meets Akira, a cheerful woman who works for a television program about wildlife. Will Samar still hope for Khushi or choose to start a new life with Akira?	Amazon Prime, Apple TV	https://www.youtube.com/watch?v=v0UXgoJ9Shg	0	farhan	7	\N	\N
82	Bajrangi Bhaijaan	\N	https://posters.movieposterdb.com/15_09/2015/3863552/s_3863552_b160f1f4.jpg	2015	Pavan, a devotee of Hanuman, faces various challenges when he tries to reunite Munni with her family after Munni goes missing while traveling back home with her mother.	Disney +, Bstation	https://www.youtube.com/watch?v=4nwAra0mz_Q	0	farhan	7	\N	\N
83	Transformers: Revenge of the Fallen	\N	https://m.media-amazon.com/images/M/MV5BNjk4OTczOTk0NF5BMl5BanBnXkFtZTcwNjQ0NzMzMw@@._V1_.jpg	2009	A youth chooses manhood. The week Sam Witwicky starts college, the Decepticons make trouble in Shanghai. A presidential envoy believes it's because the Autobots are around; he wants them gone. He's wrong: the Decepticons need access to Sam's mind to see some glyphs imprinted there that will lead them to a fragile object that, when inserted in an alien machine hidden in Egypt for centuries, will give them the power to blow out the sun. Sam, his girlfriend Mikaela Banes, and Sam's parents are in danger. Optimus Prime and Bumblebee are Sam's principal protectors. If one of them goes down, what becomes of Sam?	Netflix	https://youtu.be/fnXzKwUgDhg?si=OQS8kGFiwTr7QiNx	0	farhan	1	\N	\N
84	Transformers: Dark of the Moon	\N	https://m.media-amazon.com/images/M/MV5BMTkwOTY0MTc1NV5BMl5BanBnXkFtZTcwMDQwNjA2NQ@@._V1_FMjpg_UY478_.jpg	2011	Autobots Bumblebee, Ratchet, Ironhide, Mirage (aka Dino), Wheeljack (aka Que) and Sideswipe led by Optimus Prime, are back in action taking on the evil Decepticons, who are eager to avenge their recent defeat. The Autobots and Decepticons become involved in a perilous space race between the United States and Russia to reach a hidden Cybertronian spacecraft on the moon and learn its secrets, and once again Sam Witwicky has to go to the aid of his robot friends. The new villain Shockwave is on the scene while the Autobots and Decepticons continue to battle it out on Earth.	Netflix	https://youtu.be/97wCoDn0RrA?si=e5YzLTIFpIwrYnYe	0	farhan	1	\N	\N
85	Transformers: Age of Extinction	\N	https://m.media-amazon.com/images/M/MV5BMjEwNTg1MTA5Nl5BMl5BanBnXkFtZTgwOTg2OTM4MTE@._V1_FMjpg_UY749_.jpg	2014	After the battle between the Autobots and Decepticons that leveled Chicago, humanity thinks that all alien robots are a threat. So Harold Attinger, a CIA agent, establishes a unit whose sole purpose is to hunt down all of them. But it turns out that they are aided by another alien robot who is searching for Optimus Prime. Cade Yeager, a robotics expert, buys an old truck and upon examining it, he thinks it's a Transformer. When he powers it up, he discovers it's Optimus Prime. Later, men from the unit show up looking for Optimus. He helps Yeager and his daughter Tessa escape but are pursued by the hunter. They escape and Yeager learns from technology he took from the men that a technology magnate and defense contractor named Joshua Joyce is part of what's going on, so they go to find out what's going on.	Netflix	https://youtu.be/T9bQCAWahLk?si=8FrmWIM7-aw4mbPX	0	farhan	1	\N	\N
86	Transformers: The Last Knight	\N	https://m.media-amazon.com/images/M/MV5BYWNlNjU3ZTItYTY3Mi00YTU1LTk4NjQtYjQ3MjFiNjcyODliXkEyXkFqcGc@._V1_.jpg	2017	Having left Earth, Optimus Prime finds his dead home planet, Cybertron, and discovers that he was in fact responsible for its destruction. Optimus learns that he can bring Cybertron back to life, but in order to do so, he will need an artifact that is hidden on Earth.	Netflix	https://youtu.be/6Vtf0MszgP8?si=jChC9qfWPfCUXZIv	0	farhan	1	\N	\N
87	Transformers: Rise of the Beasts	\N	https://m.media-amazon.com/images/M/MV5BZTVkZWY5MmItYjY3OS00OWY3LTg2NWEtOWE1NmQ4NGMwZGNlXkEyXkFqcGc@._V1_FMjpg_UY711_.jpg	2023	Returning to the action and spectacle that has captivated moviegoers around the world, Transformers: Rise of the Beasts will take audiences on a global '90s adventure with the Autobots and introduce a new faction of Transformers - the Maximals - to join them as allies in the war. the ongoing battle on earth. Directed by Steven Caple Jr. and starring Anthony Ramos and Dominique Fishback	Netflix	https://youtu.be/itnqEauWQZM?si=7JF9i9hFZ3PDlpPw	0	farhan	1	\N	\N
88	Detective Conan Movie: The Sniper from Another Dimension\n\n	Meitantei Conan: Ijigen no Sniper	https://xl.movieposterdb.com/14_04/2014/3455204/xl_3455204_18202e5c.jpg	2014	After participating in the opening ceremony, Conan, Professor Agasa, Ran, Haibara, and the Detective Boys are enjoying the view from the observation deck of the 635-metre tall Bell Tree Tower. Suddenly, a bullet breaks through a window, strikes a man's chest and breaks a TV screen, causing everyone to panic. Conan stays calm and, using the zoom function on his tracking glasses to follow the path of the bullet to its source, spots the sniper. He and Masumi Sera, who had been present at the Tower as part of an assignment to shadow the victim, pursue the fleeing culprit on Masumi's motorcycle, but the chase takes a violent turn when the suspect uses a handgun and even hand grenades to take out his pursuers. Even the FBI get involved in the chase, but the culprit and the mysteries of the sniping end up vanishing into the ocean.	Netflix, Bstation	Detective Conan movie 18 sniper from another dimension full trailer HD - YouTube	0	farhan	3	\N	\N
89	Detective Conan: The Darkest Nightmare	Meitantei Conan: Junkoku no Nightmare\n	https://xl.movieposterdb.com/19_12/2016/4954660/xl_4954660_625971f4.jpg?v=2020-01-02%2013:32:54	2016	A spy infiltrated the Japanese National Police Agency, retrieving secret files of Britain's MI6, Germany's BND and America's CIA and FBI. Rei Furuya and a group of Tokyo Police PSB intercepted the spy during the getaway, and just before the major car accident, FBI Agent Shuichi Akai sniped and crashed the spy's vehicle. The next day, at the aquarium in Tokyo with the Ferris wheel, Conan and the Detective Boys found a woman with heterochromia iris who suffered memory loss and had a broken cell phone. Having decided to stay and help the woman regain her memory, Conan and the Detective Boys are under the watchful eye of Vermouth.\n	Netflix, Bstation	DETECTIVE CONAN: THE DARKEST NIGHTMARE - Official Trailer (In cinemas 7 July) - YouTube	0	farhan	3	\N	\N
90	Detective Conan: Zero The Enforcer	Meitantei Conan: Zero no Shikkounin	https://xl.movieposterdb.com/20_01/2018/7880466/xl_7880466_fb8b1bfb.jpg?v=2020-01-02%2015:53:38	2018	Detective Conan investigates an explosion that occurs on the opening day of a large Tokyo resort and convention center.\n\n	Netflix, Bstation	DETECTIVE CONAN: ZERO THE ENFORCER Official Indonesia Trailer - YouTube	0	farhan	3	\N	\N
91	Detective Conan :The Lost Ship in the Sky\n\n	Meitantei Conan: Tenkuu no rosuto shippu	https://xl.movieposterdb.com/10_08/2010/1636815/xl_1636815_c926bd5b.jpg 	2010	Kid has his eyes set on the Lady of the Sky jewel aboard Bell 3, the largest airship in the world. However, a mysterious terrorist group called Red Shamu-neko has hijacked the airship, along with Conan and his allies Kogoro and Ran.\n	Netflix, Bstation	Detective Conan Movie 14 _ Lost Ship In The Sky OFFICIAL TRAILER - YouTube	0	farhan	3	\N	\N
92	Detective Conan: The Sunflower Of Inferno	Meitantei Conan: Gouka no Himawari\n	https://xl.movieposterdb.com/15_08/2015/3737650/xl_3737650_927f2a54.jpg	2015	Conan and his friends must prevent Kid from stealing a famous painting.\n\n	Netflix, Bstation	Detective Conan: Sunflowers of Inferno Official Trailer - YouTube	0	farhan	3	\N	\N
93	Locke and Key	\N	https://m.media-amazon.com/images/M/MV5BOTdkMDY3NDctZTgyZi00Yzc3LTk1ZWEtNWUxNTVlN2YzNDU3XkEyXkFqcGdeQXVyNDk3ODk4OQ@@._V1_.jpg	2020	After their father is murdered under mysterious circumstances, the three Locke siblings and their mother move into their ancestral home, Keyhouse, which they discover is full of magical keys that may be connected to their father's death.	Netflix	https://youtu.be/_EonRi0yQOE?si=IIhKwJs7h3N2AyrM	0	farhan	1	\N	\N
94	Gadis Kretek	Cigarette Girl	https://m.media-amazon.com/images/M/MV5BYzcxYzIzODItMTljNy00OGYwLWJmMWUtNzIyZDdiOTI1MWNlXkEyXkFqcGdeQXVyMTEzMTI1Mjk3._V1_.jpg	2023	Amid the evocative blend of flavorful spices to create the perfect kretek cigarette, two souls embark on an epic romance set in 1960s Indonesia.	Netflix	https://youtu.be/PJybk11EIm8?si=-5o7RqiijqWx9kiS	0	farhan	2	\N	\N
95	Nightmares and Daydreams	\N	https://m.media-amazon.com/images/M/MV5BMTc4N2M4OTEtMGExMS00MDJkLWJkYjUtOTI5MmQ4NjhjYjJiXkEyXkFqcGdeQXVyMTEzMTI1Mjk3._V1_.jpg	2024	Ordinary people encountering strange phenomenons that may be keys to the answer about the origin of our world and the imminent threat we will soon face.	Netflix	https://youtu.be/YF6s3lIc17Q?si=vOut8-buvxyfIW0m	0	farhan	2	\N	\N
96	Bohemian Rhapsody	\N	https://m.media-amazon.com/images/M/MV5BMTA2NDc3Njg5NDVeQTJeQWpwZ15BbWU4MDc1NDcxNTUz._V1_FMjpg_UX1000_.jpg	2018	The story of the legendary British rock band Queen and lead singer Freddie Mercury, leading up to their famous performance at Live Aid (1985)	Netflix	https://youtu.be/mP0VHJYFOAU?si=tEUYVdP5TE_NHU7a	0	farhan	1	\N	\N
97	Young Sheldon	\N	https://m.media-amazon.com/images/M/MV5BZTlmYjk0ZTItODNhMC00YmIyLWExZWEtYjk0YWQzMGNhOTZmXkEyXkFqcGdeQXVyMTY0Njc2MTUx._V1_FMjpg_UX1000_.jpg	2017	Meet a child genius named Sheldon Cooper (already seen as an adult in The Big Bang Theory (2007)) and his family. Some unique challenges face Sheldon, who is socially impaired.	Netflix, Prime Video	https://youtu.be/FStMMcj-RiA?si=gJ_zZkkNb1jB-4uJ	0	farhan	1	\N	\N
98	Spy Kids	\N	https://m.media-amazon.com/images/M/MV5BY2JhODU1NmQtNjllYS00ZmQwLWEwZjYtMTE5NjA1M2YyMzdjXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_QL75_UX190_CR0,0,190,281_.jpg	2001	The film opens with Carmen and Juni Cortez (Alexa Vega and Daryl Sabara) being tucked into bed by their mother, Ingrid (Carla Gugino). While Juni applies wart killer to his fingers, Carmen requests to hear the bedtime story, The Two Spies Who Fell in Love.	Netflix	https://youtu.be/GE5aHKJp6HI?si=rwvzLkvs829Sn2qE	0	farhan	1	\N	\N
99	Spy Kids 2: The Island of Lost Dreams	\N	https://m.media-amazon.com/images/I/51UtV22RQPL._AC_UF1000,1000_QL80_.jpg	2002	The Cortez siblings set out for a mysterious island, where they encounter a genetic scientist and a set of rival spy kids.	Vidio	https://youtu.be/8tTJ7kMgANg?si=w5iOj2O2Y07Jm0LG	0	farhan	1	\N	\N
100	Spy Kids 3-D: Game Over	\N	https://m.media-amazon.com/images/I/51J30GKHNGL._AC_UF894,1000_QL80_.jpg	2003	Carmen's caught in a virtual reality game designed by the Kids' new nemesis, the Toymaker. It's up to Juni to save his sister, and ultimately the world.	Vidio	https://youtu.be/GeFgj3CsfpI?si=8qIqAfIdRUVQ4yoR	0	farhan	1	\N	\N
101	Spy Kids: All the Time in the World	\N	https://m.media-amazon.com/images/I/810QZaXJdML._AC_UF894,1000_QL80_.jpg	2011	A retired spy is called back into action, and to bond with her new step-children, she invites them along for the adventure to stop the evil Timekeeper from taking over the world.	Prime Video	https://youtu.be/yUdkW8Nvpx8?si=-ong0RPOvUgjAAC7	0	farhan	1	\N	\N
102	Spy Kids: Armageddon	\N	https://m.media-amazon.com/images/M/MV5BYzRkYjRmNDYtOGYyYS00ZWJjLWIzMTYtYmIyYTYwN2M1NTM4XkEyXkFqcGdeQXVyNDc5NDc2Nw@@._V1_.jpg	2023	Tony (Connor Esterson) and Patty (Everly Carganilla) were quite good at playing online games, and they spend most of their time doing that, which is why their parents, Terrence Tango (Zachary Levi) and Nora Torrez (Gina Rodriguez), had some strict rules in place. Terrence has these rules as Terence and Nora are spies and their computers host the top-secret Armageddon code, and they are afraid that someone might use their kids' computers to hack into their network and steal the Armageddon code. Both spies are told by their boss Devlin that unknown assailants are trying to break into OSS servers to get to the Armageddon code.	Netflix	https://youtu.be/TuiRw0v3bAw?si=cbsMjAM9vs090sIv	0	farhan	1	\N	\N
103	Oh My Ghost	오 나의 귀신님 (Oh Naui Gwisinnim)	https://thumbor.prod.vidiocdn.com/AcDmZjSup_7kgrDdRlExK4r-Jrw=/filters:quality(70)/vidio-media-production/uploads/image/source/4683/384411.jpg	2015	The story follows a shy assistant chef who gets possessed by a lustful virgin ghost. With her newfound confidence, she tries to seduce her boss, but things get complicated as they all get entangled in the ghost's unfinished business.	Viu	https://youtu.be/dgVZdt1j8-M?si=BPMBlS3tf7U5C8Fi 	0	farhan	0	\N	\N
104	Reply1988	응답하라 1988 (Eungdabhara 1988)	https://upload.wikimedia.org/wikipedia/id/d/d8/TVN%27s_Reply_1988_%28%EC%9D%91%EB%8B%B5%ED%95%98%EB%9D%BC_1988%29_poster.jpg	2015	Set in the late 1980s, this drama follows five childhood friends who live in the same neighborhood. It captures the warmth and hardships of their families, the joys of friendship, and the sweet moments of first love.	Netflix	https://youtu.be/hDI4IpZoaG4?si=KgGRZyiRAZLM5J4y	0	farhan	0	\N	\N
105	My Liberation Notes	나의 해방일지 (Naui Haebangilji)	https://asianwiki.com/images/1/14/My_Liberation_Notes-p1.jpg	2022	This series portrays the lives of three siblings who long to escape their mundane lives and find true liberation. They meet a mysterious stranger who changes their perspectives on life.	Netflix	https://youtu.be/EwqFfHRPp8Q?si=gNlXZWBcVj-rF2hd	0	farhan	0	\N	\N
106	Mouse	마우스 (Mauseu)	https://assets-a1.kompasiana.com/items/album/2021/06/29/mouse-03-60dae4471525104a40180012.jpg	2021	A suspenseful thriller that explores the question of whether psychopaths are born or made. The story follows a rookie police officer who encounters a psychopathic killer that leads to a chase filled with mind games.	Netflix	https://youtu.be/Q6Nki1_8RBU?si=Grd1A0ii_PNgJtjS	0	farhan	0	\N	\N
107	Moving	무빙 (Mubing)	https://asianwiki.com/images/e/ec/Moving-MP1.jpeg	2023	A supernatural drama about a group of teenagers who inherit superpowers from their parents. They struggle to protect their secrets while trying to understand the origins of their abilities.	Disney+	https://www.youtube.com/watch?v=UVYw3biOgyE	0	farhan	0	\N	\N
108	Pacific Rim	\N	https://m.media-amazon.com/images/M/MV5BMTY3MTI5NjQ4Nl5BMl5BanBnXkFtZTcwOTU1OTU0OQ@@._V1_.jpg	2013	Long ago, legions of monstrous creatures called Kaiju arose from the sea, bringing with them all-consuming war. To fight the Kaiju, mankind developed giant robots called Jaegers, designed to be piloted by two humans locked together in a neural bridge. However, even the Jaegers are not enough to defeat the Kaiju, and humanity is on the verge of defeat. Mankind's last hope now lies with a washed-up ex-pilot, an untested trainee and an old, obsolete Jaeger.	Netflix	https://youtu.be/5guMumPFBag?si=5lGCXjccMSJB37yy	0	farhan	1	\N	\N
109	Pacific Rim: Uprising	\N	https://m.media-amazon.com/images/M/MV5BMjI3Nzg0MTM5NF5BMl5BanBnXkFtZTgwOTE2MTgwNTM@._V1_.jpg	2018	Jake Pentecost is a once-promising Jaeger pilot whose legendary father gave his life to secure humanity's victory against the monstrous Kaiju. Jake has since abandoned his training only to become caught up in a criminal underworld. But when an even more unstoppable threat is unleashed to tear through cities and bring the world to its knees, Jake is given one last chance by his estranged sister, Mako Mori, to live up to his father's legacy.	Netflix	https://youtu.be/8BAhwgjMvnM?si=9OdTE_h4sGgCLVce	0	farhan	1	\N	\N
110	The Da Vinci Code	\N	https://upload.wikimedia.org/wikipedia/id/9/9b/The_da_vinci_code.jpg	2006	A murder in Paris' Louvre Museum and cryptic clues in some of Leonardo da Vinci's most famous paintings lead to the discovery of a religious mystery. For 2,000 years a secret society closely guards information that -- should it come to light -- could rock the very foundations of Christianity.	Netflix	https://youtu.be/5sU9MT8829k?si=hlYLoPjj0NzxCTS3	0	farhan	1	\N	\N
111	Inferno	\N	https://m.media-amazon.com/images/M/MV5BMTUzNTE2NTkzMV5BMl5BanBnXkFtZTgwMDAzOTUyMDI@._V1_.jpg	2016	Famous symbologist Robert Langdon (Tom Hanks) follows a trail of clues tied to Dante, the great medieval poet. When Langdon wakes up in an Italian hospital with amnesia, he teams up with Sienna Brooks (Felicity Jones), a doctor he hopes will help him recover his memories. Together, they race across Europe and against the clock to stop a madman (Ben Foster) from unleashing a virus that could wipe out half of the world's population.	Netflix	https://youtu.be/RH2BD49sEZI?si=M0D6nbooVBubx2qI	0	farhan	1	\N	\N
112	6 Underground	\N	https://m.media-amazon.com/images/M/MV5BNzE2ZjQxNjEtNmI2ZS00ZmU0LTg4M2YtYzVhYmRiYWU0YzI1XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg	2019	Six individuals from all around the globe, each the very best at what they do, have been chosen not only for their skill, but for a unique desire to delete their pasts to change the future.	Netflix	https://youtu.be/YLE85olJjp8?si=RhBp3nlYhwKVT7p5	0	farhan	1	\N	\N
113	You're Beautiful 	\N	https://s-media-cache-ak0.pinimg.com/564x/7a/87/30/7a873069c66b38b6cb6f35e60eb04074.jpg	2009	Go Mi-Nyu, a girl about to become a nun, is asked to cover for her indisposed twin brother, Mi-Nam, who's on the verge of becoming a k-idol. To do so, she disguises herself as a boy and joins A.N.Jell, a really popular boy band.	Viki, Rakuten	https://www.youtube.com/watch?v=Va3jnNTzmZY&pp=ygUgeW91cmUgYmVhdXRpZnVsIG9mZmljaWFsIHRyYWlsZXI%3D	0	farhan	0	\N	\N
114	Castle	\N	https://static.cinemagia.ro/img/db/movie/03/49/80/castle-160337l.jpg	2009	When a psychopath commits murders based on novelist Castle's books, Detective Beckett seeks his help to solve the case. He decides to work with her and uses his experiences as research for his novels.	Hulu, Amazon Prime Video	https://www.youtube.com/watch?v=aaorTM2wB9o&pp=ygUXY2FzdGxlIG9mZmljaWFsIHRyYWlsZXI%3D	0	farhan	1	\N	\N
115	Molly's Game	\N	https://4.bp.blogspot.com/-jbVXtigI4no/WkCLBVdBCXI/AAAAAAAAfvA/4orTYwz3gAwy1jastsvDestxZIyuOGiNwCLcBGAs/s1600/mollys-game-341902ID1b_MollysGame_OneSheet_RGB_ComingSoon_Trim_email%255B2%255D_rgb.jpg	2017	The true story of Molly Bloom, an Olympic-class skier who ran the world's most exclusive high-stakes poker game and became an FBI target.	Netflix, Amazon Prime Video	https://www.youtube.com/watch?v=Vu4UPet8Nyc&pp=ygUcbW9sbHlzIGdhbWUgb2ZmaWNpYWwgdHJhaWxlcg%3D%3D	0	farhan	1	\N	\N
116	Kiki's Delivery Service	\N	https://m.media-amazon.com/images/M/MV5BYTQ1ZTM1ZTgtN2Q2Ny00YjFkLTliNjEtN2I1ZmY5ZTY1OTEzXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_FMjpg_UX1000_.jpg	1889	Along with her black cat Jiji, Kiki settles in a seaside town and starts a high-flying delivery service. Here begins her magical encounter with independence and responsibility, making lifelong friends and finding her place in the world.	HBO Max, Amazon Prime Video, Netflix 	https://www.youtube.com/watch?v=4bG17OYs-GA&pp=ygUoa2lraSdzIGRlbGl2ZXJ5IHNlcnZpY2Ugb2ZmaWNpYWwgdHJhaWxlcg%3D%3D	0	farhan	3	\N	\N
117	Criminal Mind	\N	https://picfiles.alphacoders.com/125/thumb-1920-125663.jpg	2005	A group of criminal profilers who work for the FBI as members of its Behavioral Analysis Unit (BAU) using behavioral analysis and profiling to help investigate crimes and find the suspect known as the unsub.	Hulu, Paramount+, Amazon Prime Video	https://www.youtube.com/watch?v=d73rBmyRNH4&pp=ygUeY3JpbWluYWwgbWluZCBvZmZpY2lhbCB0cmFpbGVy	0	farhan	1	\N	\N
118	Detective Conan: The Last Wizard of the Century	Meitantei Konan: Seikimatsu no Majutsushi	https://www.detectiveconanworld.com/wiki/images/thumb/6/6f/Movie3poster.jpg/275px-Movie3poster.jpg	1999	Conan takes on the notorious thief Kaitou Kid in a battle of wits involving a precious Russian Easter egg.	Amazon Prime Video, Crunchyroll	https://youtu.be/YW_t7Y93Rnc?si=o0cLyqfNEmw20s9w	0	farhan	3	\N	\N
119	Detective Conan: Captured in Her Eyes	Meitantei Konan: Hitomi no Naka no Ansatsusha	https://www.detectiveconanworld.com/wiki/images/thumb/5/59/Movie4poster.jpg/275px-Movie4poster.jpg	2000	After witnessing a murder, Ran loses her memory and Conan must protect her from being targeted by the killer.	\N	https://youtu.be/kZGz0zrzlQw?si=HzeIPA9FWfM5TN0M	0	farhan	3	\N	\N
120	Home Alone	\N	https://upload.wikimedia.org/wikipedia/en/7/76/Home_alone_poster.jpg	1990	An 8-year-old boy is accidentally left home alone by his family during Christmas vacation and must defend his home against two inept burglars.	Disney+, Amazon Prime Video	https://youtu.be/NOIgZYlYvyk?si=WRFYgNPzHPNAeNy0	0	farhan	1	\N	\N
121	Home Alone 2: Lost in New York	\N	https://upload.wikimedia.org/wikipedia/en/thumb/5/50/Home_Alone_2.jpg/220px-Home_Alone_2.jpg	1992	Kevin accidentally boards a flight to New York City and gets separated from his family who are on their way to Miami. He then bumps into two of his old enemies, who plan to rob a toy store.	Disney+, Amazon Prime Video, Hulu	https://youtu.be/5h9VDUNtoto?si=B0bqZ_SQxU9Exswt	0	farhan	1	\N	\N
122	Home Alone 3	\N	https://upload.wikimedia.org/wikipedia/en/c/cc/Home_Alone_3_film.jpg	1997	Alex Pruitt, an 8-year-old boy living in Chicago, must fend off international spies who seek a top-secret computer chip in his toy car.	Disney+, Amazon Prime Video	https://youtu.be/PP--dDh4axI?si=OV6lgDXfIUOAD8Qk	0	farhan	1	\N	\N
123	Despicable Me	\N	https://xl.movieposterdb.com/10_06/2010/1323594/xl_1323594_2b69270c.jpg?v=2024-08-05%2013:30:11	2010	In a happy suburban neighborhood surrounded by white picket fences with flowering rose bushes, sits a black house with a dead lawn. Unbeknownst to the neighbors, hidden beneath this house is a vast secret hideout. Surrounded by a small army of minions, we discover Gru (Steve Carell), planning the biggest heist in the history of the world. He is going to steal the moon. Gru delights in all things wicked. Armed with his arsenal of shrink rays, freeze rays, and battle-ready vehicles for land and air, he vanquishes all who stand in his way. Until the day he encounters the immense will of three little orphaned girls who look at him and see something that no one else has ever seen: a potential Dad. The world's greatest villain has just met his greatest challenge: three little girls named Margo (Miranda Cosgrove), Edith (Dana Gaier), and Agnes (Elsie Fisher).	Netflix	https://youtu.be/zzCZ1W_CUoI?si=9zVVTZI8tBr7SxkQ	0	farhan	1	\N	\N
124	Despicable Me 2	\N	https://xl.movieposterdb.com/15_02/2013/1690953/xl_1690953_473a6949.jpg?v=2024-05-16%2019:32:27	2013	While Gru, the ex-supervillain is adjusting to family life and an attempted honest living in the jam business, a secret Arctic laboratory is stolen. The Anti-Villain League decides it needs an insider's help and recruits Gru in the investigation. Together with the eccentric AVL agent, Lucy Wilde, Gru concludes that his prime suspect is the presumed dead supervillain, El Macho, whose his teenage son is also making the moves on his eldest daughter, Margo. Seemingly blinded by his overprotectiveness of his children and his growing mutual attraction to Lucy, Gru seems on the wrong track even as his minions are being quietly kidnapped en masse for some malevolent purpose.	Netflix	https://youtu.be/TlbnGSMJQbQ?si=7fwRoOeiDCimK7Yq	0	farhan	1	\N	\N
125	Despicable Me 3	\N	https://xl.movieposterdb.com/20_06/2017/3469046/xl_3469046_30126921.jpg?v=2024-08-06%2019:50:11	2017	After he is fired from the Anti-Villain League for failing to take down the latest bad guy to threaten humanity, Gru (Steve Carell) finds himself in the midst of a major identity crisis. But when a mysterious stranger shows up to inform Gru that he has a long-lost twin brother - a brother who desperately wishes to follow in his twin's despicable footsteps - one former supervillain will rediscover just how good it feels to be bad.	Netflix	https://youtu.be/6DBi41reeF0?si=M3-e-Dc0alqjbnZ6	0	farhan	1	\N	\N
126	Despicable Me 4	\N	https://xl.movieposterdb.com/24_02/2024/7510222/xl_despicable-me-4-movie-poster_3c4ff16e.jpg?v=2024-08-19%2012:46:58	2024	Gru, Lucy, Margo, Edith, and Agnes welcome a new member to the family, Gru Jr., who is intent on tormenting his dad. Gru faces a new nemesis in Maxime Le Mal and his girlfriend Valentina, and the family is forced to go on the run.	\N	https://youtu.be/LtNYaH61dXY?si=iuxTe-GH10U-jktB	0	farhan	1	\N	\N
127	Minions	\N	https://xl.movieposterdb.com/15_02/2015/2293640/xl_2293640_644af6d9.jpg?v=2024-08-06%2001:11:59	2015	Ever since the dawn of time, the Minions have lived to serve the most despicable of masters. From the T-Rex to Napoleon, the easily distracted tribe has helped the biggest and the baddest of villains. Now, join protective leader Kevin, teenage rebel Stuart, and lovable little Bob on a global road trip. They'll earn a shot to work for a new boss, the world's first female supervillain, and try to save all of Minionkind from annihilation.	Netflix	https://youtu.be/eisKxhjBnZ0?si=6CXztBK0pwJoTU2V	0	farhan	1	\N	\N
148	Ong-Bak 3	\N	https://es.web.img3.acsta.net/r_1280_720/medias/nmedia/18/82/35/79/19840043.jpg 	2010	This film continues from Ong Bak 2, with Ting now as a ruler striving to restore honor and peace to his kingdom after various conflicts. Ting must confront enemies and challenges to save his village.	Amazon Prime Video, Netflix, \nyoutube	https://youtu.be/ELXzjJ1RiWA?feature=shared\n	0	farhan	8	\N	\N
128	Pirates of the Caribbean: The Curse of the Black Pearl	\N	https://a.ltrbxd.com/resized/film-poster/2/6/9/5/2695-pirates-of-the-caribbean-the-curse-of-the-black-pearl-0-1000-0-1500-crop.jpg?v=272b36c0d8	2003	This swash-buckling tale follows the quest of Captain Jack Sparrow, a savvy pirate, and Will Turner, a resourceful blacksmith, as they search for Elizabeth Swann. Elizabeth, the daughter of the governor and the love of Will's life, has been kidnapped by the feared Captain Barbossa. Little do they know, but the fierce and clever Barbossa has been cursed. He, along with his large crew, are under an ancient curse, doomed for eternity to neither live, nor die. That is, unless a blood sacrifice is made	Hotstar	https://youtu.be/naQr0uTrH_s?si=v4LXSox8FcDrPK6y	0	farhan	1	\N	\N
129	Pirates of the Caribbean: Dead Man's Chest	\N	https://a.ltrbxd.com/resized/film-poster/5/1/9/8/9/51989-pirates-of-the-caribbean-dead-man-s-chest-0-1000-0-1500-crop.jpg?v=f9c46ae728	2006	Once again we're plunged into the world of sword fights and savvy pirates. Captain Jack Sparrow is reminded he owes a debt to Davy Jones, who captains the flying Dutchman, a ghostly ship, with a crew from hell. Facing the locker Jack must find the heart of Davy Jones but to save himself he must get the help of quick-witted Will Turner and Elizabeth Swann. If that's not complicated enough, Will and Elizabeth are sentenced to hang, unless Will can get Lord Cutler Beckett Jack's compass. Will is forced to join another crazy adventure with Jack.	Hotstar	https://youtu.be/SNA-Ezahmok?si=Sh13Whh-ESV4Hukc	0	farhan	1	\N	\N
130	Pirates of the Caribbean: At World's End	\N	https://a.ltrbxd.com/resized/film-poster/5/1/7/7/3/51773-pirates-of-the-caribbean-at-world-s-end-0-1000-0-1500-crop.jpg?v=6d572cf726	2007	After losing Jack Sparrow to the locker of Davy Jones, the team of Will Turner, Elizabeth Swan and Captain Barbossa make their final alliances with the pirate world to take on the forces of Lord Cutler Beckett and his crew, including Davy Jones, who he now has control over. It's not going to be easy, as they must rescue Sparrow, convince all the pirate lords to join them and defeats Beckett, whilst each individual pirate has their own route which they wish to follow. 	Hotstar	https://youtu.be/HKSZtp_OGHY?si=Yf_jU7WrbUvWgf2n	0	farhan	1	\N	\N
131	Pirates of the Caribbean: On Stranger Tides	\N	https://a.ltrbxd.com/resized/film-poster/5/0/7/3/5/50735-pirates-of-the-caribbean-on-stranger-tides-0-1000-0-1500-crop.jpg?v=84b9897282	2011	Captain Jack Sparrow (Johnny Depp) crosses paths with a woman from his past, Angelica (Penélope Cruz), and he's not sure if it's love, or if she's a ruthless con artist who's using him to find the fabled Fountain of Youth. When she forces him aboard the Queen Anne's Revenge, the ship of the formidable pirate Blackbeard (Ian McShane), Jack finds himself on an unexpected adventure in which he doesn't know who to fear more: Blackbeard or the woman from his past.	Hotstar	https://youtu.be/0BXCVe8Yww4?si=J1wWAZ4nziK5UT_U	0	farhan	1	\N	\N
132	Pirates of the Caribbean: Dead Men Tell No Tales	\N	https://a.ltrbxd.com/resized/film-poster/1/2/3/0/6/6/123066-pirates-of-the-caribbean-dead-men-tell-no-tales-0-1000-0-1500-crop.jpg?v=67c23b3308	2017	Captain Jack Sparrow (Johnny Depp) finds the winds of ill-fortune blowing even more strongly when deadly ghost pirates led by his old nemesis, the terrifying Captain Salazar (Javier Bardem), escape from the Devil's Triangle, determined to kill every pirate at sea...including him. Captain Jack's only hope of survival lies in seeking out the legendary Trident of Poseidon, a powerful artifact that bestows upon its possessor total control over the seas.	Hotstar	https://youtu.be/Hgeu5rhoxxY?si=skbqzd6mgLHh4Fio	0	farhan	1	\N	\N
133	Tokidoki Bosotto Russia-go de Dereru Tonari no Alya-san	Alya Sometimes Hides Her Feelings in Russian	https://cdn.myanimelist.net/images/anime/1825/142258.jpg	2024	Seirei Academy is a prestigious school attended by the very best students in Japan. Alisa Mikhailovna Alya Kujou, the half-Russian and half-Japanese treasurer of the school's student council, is known for her intelligence, stunning looks, and rigid personality. Contrasting her near-flawless persona, Alya's unmotivated classmate Masachika Kuze slacks off during lessons and seems to show no interest in her.\n\nInitially irritated, Alya gradually becomes more intrigued by Masachika and starts expressing her affection for him in Russian. However, she is oblivious to his secret—he understands the language fluently! Due to a childhood friend who was temporarily staying in Japan, Masachika has been studying Russian in hopes of reuniting with her.\n\nAs the two spend more time together, the playful and eccentric relationship between them quickly deepens. In the meantime, both must learn to navigate their new growing feelings for one another.	Cruncyroll	https://www.youtube.com/watch?v=pBX6TtOlYow	0	farhan	3	\N	\N
134	Godzilla x Kong: The New Empire	\N	https://posters.movieposterdb.com/24_03/2024/14539740/s_godzilla-x-kong-the-new-empire-movie-poster_df4bd47b.jpg	2024	Two ancient titans, Godzilla and Kong, clash in an epic battle as humans unravel their intertwined origins and connection to Skull Island's mysteries.	Netflix	https://www.youtube.com/watch?v=lV1OOlGwExM	0	farhan	1	\N	\N
135	Kiss x Sis	\N	https://cdn.myanimelist.net/images/anime/1660/121553.jpg	2010	After Keita Suminoe's mother passed away, his father promptly remarried, introducing two step-sisters into Keita's life: twins Ako and Riko. But since their fateful first encounter, a surge of incestuous love for their younger brother overcame the girls, beginning a lifelong feud for his heart.\n\nNow at the end of his middle school career, Keita studies fervently to be able to attend Ako and Riko's high school. While doing so however, he must resolve his conflicting feelings for his siblings and either reject or succumb to his sisters' intimate advances. Fortunately—or perhaps unfortunately for Keita—his sisters aren't the only women lusting after him, and there's no telling when the allure of temptation will get the better of the boy as well.	BiliBili	https://youtu.be/hemw2TBFtP8	0	farhan	3	\N	\N
136	Shingeki no Kyojin Season 3 Part 2	Attack on Titan Season 3 Part 2	https://cdn.myanimelist.net/images/anime/1517/100633.jpg	2019	Seeking to restore humanity's diminishing hope, the Survey Corps embark on a mission to retake Wall Maria, where the battle against the merciless Titans takes the stage once again.\n\nReturning to the tattered Shiganshina District that was once his home, Eren Yeager and the Corps find the town oddly unoccupied by Titans. Even after the outer gate is plugged, they strangely encounter no opposition. The mission progresses smoothly until Armin Arlert, highly suspicious of the enemy's absence, discovers distressing signs of a potential scheme against them.\n\nShingeki no Kyojin Season 3 Part 2 follows Eren as he vows to take back everything that was once his. Alongside him, the Survey Corps strive—through countless sacrifices—to carve a path towards victory and uncover the secrets locked away in the Yeager family's basement.	Netflix	https://youtu.be/hKHepjfj5Tw	0	farhan	3	\N	\N
137	Annabelle	\N	https://posters.movieposterdb.com/14_09/2014/3322940/l_3322940_9caff983.jpg	2014	A couple begins to experience terrifying supernatural occurrences involving a vintage doll shortly after their home is invaded by satanic cultists.	Netflix	https://www.youtube.com/watch?v=paFgQNPGlsg	0	farhan	1	\N	\N
138	InuYasha	\N	https://cdn.myanimelist.net/images/anime/1589/95329.jpg	2000	Kagome Higurashi's 15th birthday takes a sudden turn when she is forcefully pulled by a demon into the old well of her family's shrine. Brought to the past, when demons were a common sight in feudal Japan, Kagome finds herself persistently hunted by these vile creatures, all yearning for an item she unknowingly carries: the Shikon Jewel, a small sphere holding extraordinary power. Amid such a predicament, Kagome encounters a half-demon boy named Inuyasha who mistakes her for Kikyou, a shrine maiden he seems to resent. Because of her resemblance to Kikyou, Inuyasha takes a violent dislike to Kagome. However, after realizing the dire circumstances they are both in, he sets aside his hostility and lends her a hand. Unfortunately, during a fight for the Shikon Jewel, the miraculous object ends up shattered into pieces and scattered across the land. Fearing the disastrous consequences of this accident, Kagome and Inuyasha set out on a challenging quest to recover the shards before they fall into the wrong hands.	Hulu	https://youtu.be/n5f47FVUlrs	0	farhan	3	\N	\N
139	InuYasha: Kanketsu-hen	InuYasha: The Final Act	https://cdn.myanimelist.net/images/anime/7/75570.jpg	2009	Thwarted again by Naraku, Inuyasha, Kagome Higurashi, and their friends must continue their hunt for the few remaining Shikon Jewel shards, lest they fully form into a corrupted jewel at the hands of Naraku. But Naraku has plans of his own to acquire them, and will destroy anyone and anything standing in his way—even his own underlings. The persistent, unyielding danger posed by Naraku forces Sango and Miroku to decide what is most important to them—each other or their duty in battle. Meanwhile, Inuyasha must decide whether his heart lies with Kikyou or Kagome, before fate decides for him. Amid the race to find the shards, Inuyasha and his brother Sesshoumaru must also resolve their feud and cooperate for their final confrontation with Naraku, as it is a battle they must win in order to put a stop to his evil and cruelty once and for all.	Hulu	https://youtu.be/BcAuqVLCsZE	0	farhan	3	\N	\N
140	InuYasha Movie 1: Toki wo Koeru Omoi	InuYasha the Movie: Affections Touching Across Time	https://cdn.myanimelist.net/images/anime/1683/94370.jpg	2001	During their quest in the feudal era to recover the shards of the miraculous Shikon Jewel, Inuyasha, Kagome Higurashi, and their friends become the target of Menoumaru Hyouga—a demon awakened by one of the Shikon fragments, now in pursuit of Inuyasha's heirloom sword Tessaiga. Following a clash between the fathers of Inuyasha and Menoumaru, the weapon is the only means to restore Menoumaru his rightful family heritage. However, upon ambushing Inuyasha, Menoumaru discovers that Tessaiga's owner alone can wield it. Determined to achieve his objective regardless, he kidnaps Kagome to force Inuyasha to use his blade and release the sealed powers of the Hyouga clan. With their dependable companions' assistance, Inuyasha and Kagome oppose Menoumaru, unaware that his sinister intentions and alarming potential will endanger not only their world but also its distant future.	Hoopla	https://youtu.be/hGhgHK4xKF4?si=ai_aipVgrpsYm_eZ	0	farhan	3	\N	\N
141	InuYasha Movie 2: Kagami no Naka no Mugenjou	InuYasha the Movie 2: The Castle Beyond the Looking Glass	https://cdn.myanimelist.net/images/anime/1162/92219.jpg	2002	Fortune smiles on Inuyasha and his allies when they finally defeat their nemesis Naraku, who has caused them unrelenting hardships. Overjoyed by the long-awaited victory, they all hurry to resume their former lives, unaware that danger still lurks around. Kanna and Kagura, two of Naraku's subordinates, make arrangements to set free a sealed demonic entity that claims to be Kaguya, the legendary Princess of the Heavens. Although preoccupied with their own endeavors, Inuyasha's group members reunite by a string of unusual coincidences involving Kanna and Kagura along with an inexplicable phenomenon of repeated full-moon nights. Upon realizing that Kaguya is behind the troubling events and that she holds a terrible power, they join forces once more to stop the disastrous fate she has planned for the world.	Hoopla	https://youtu.be/BZiXEbZ9OQg	0	farhan	3	\N	\N
142	Hanyou no Yashahime: Sengoku Otogizoushi	Yashahime: Princess Half-Demon	https://cdn.myanimelist.net/images/anime/1005/114781.jpg	2020	Half-demon twins Towa and Setsuna were always together, living happily in Feudal Japan. But their joyous days come to an end when a forest fire separates them and Towa is thrown through a portal to modern-day Japan. There, she is found by Souta Higurashi, who raises her as his daughter after Towa finds herself unable to return to her time. Ten years later, 14-year-old Towa is a relatively well-adjusted student, despite the fact that she often gets into fights. However, unexpected trouble arrives on her doorstep in the form of three visitors from Feudal Japan; Moroha, a bounty hunter; Setsuna, a demon slayer and Towa's long-lost twin sister; and Mistress Three-Eyes, a demon seeking a mystical object. Working together, the girls defeat their foe, but in the process, Towa discovers to her horror that Setsuna has no memory of her at all. Hanyou no Yashahime: Sengoku Otogizoushi follows the three girls as they endeavor to remedy Setsuna's memory loss, as well as discover the truth about their linked destinies.	Youtube Ani One	https://youtu.be/O9c9AWheBdQ	0	farhan	3	\N	\N
143	Record of Youth	The Moment of 18	https://h7.alamy.com/comp/2DA5DMM/record-of-youth-aka-chungchungirok-poster-from-left-byeon-woo-seok-park-so-dam-park-bo-gum-season-1-premiered-in-the-us-sep-7-2020-photo-netflix-courtesy-everett-collection-2DA5DMM.jpg	2020	The series follows the lives of three young adults as they navigate the challenges of pursuing their dreams in the competitive world of entertainment and fashion while dealing with love, friendship, and family.	Netflix	https://youtu.be/tahWtPeNkM0	0	farhan	0	\N	\N
144	Start-Up	Sandbox	https://cinemags.org/?attachment_id=159160	2020	Start-Up is set in the fictional South Korean Silicon Valley called Sandbox and follows the story of young entrepreneurs striving to build their own companies, navigating challenges in business and relationships.	Netflix	https://youtu.be/QLiAdBBAVxI	0	farhan	0	\N	\N
145	Kill It	\N	https://www.movieposterdb.com/kill-it-i9772814	2019	The story revolves around a skilled assassin who secretly works as a veterinarian and embarks on a journey to find his true identity while being pursued by a detective who is determined to catch him.	Viki, Amazon Prime	https://www.youtube.com/watch?v=bHhxocusS7M	0	farhan	0	\N	\N
146	Ong-Bak 1	 Muay Thai Warrior	https://image.tmdb.org/t/p/original/5iG1Ql7pQJd5gnG77BruaVYjLUq.jpg	2003	Ong Bak follows a Muay Thai fighter named Ting who embarks on a quest to retrieve a stolen Buddha statue’s head from his village. Ting faces numerous obstacles and dangerous enemies in Bangkok.	Amazon Prime Video, Netflix, \nyoutube	https://youtu.be/GQ5qcPsCP9A?feature=shared	0	farhan	8	\N	\N
147	Ong-Bak 2	The Beginning 	https://image.tmdb.org/t/p/original/dAOREYQcl0qWwpN2SPp4yDUk1VG.jpg	2008	This sequel serves as a prequel to the first film, following the story of a hero born as the son of a ruler who becomes a warrior seeking revenge. The film explores Ting’s journey to avenge his family and combat enemies who have destroyed his life.	Amazon Prime Video, Netflix, \nyoutube	https://youtu.be/lml3uGdL0RM?feature=shared	0	farhan	8	\N	\N
149	Pee Mak Phrakanong	\N	https://xl.movieposterdb.com/13_04/2013/2776344/xl_2776344_a3e9a2f0.jpg?v=2024-09-06%2003:26:37	2013	After serving in the war, Mak invites his four soldier friends to his home. Upon arrival they witness the village terrified of a ghost. The four friends hear rumors that the ghost is Mak's wife Nak. Based on Thai folklore.	Netflix	https://www.youtube.com/watch?v=B9xbj_UK1pc	0	farhan	8	\N	\N
150	Top Secret: Wai roon pun lan	\N	https://xl.movieposterdb.com/12_03/2011/2292955/xl_2292955_4e3dd665.jpg	2011	Teen gamer turned businessman launches bestselling seaweed snack brand after family bankruptcy, earning 800 million baht yearly revenue by age 26.	Netflix	https://www.youtube.com/watch?v=3jocFB7TZaQ	0	farhan	8	\N	\N
151	SuckSeed: Huay Khan Thep	\N	https://media-cache.cinematerial.com/p/500x/rumdotbn/suckseed-huay-khan-thep-thai-movie-poster.jpg?v=1576006547	2011	As a young boy, Ped was a geeky kid who held a crush on classmate Ern. When Ern moved away with her family to Bangkok, Ped was crushed. Now in high school, Ped and Ern are reunited after she backs to her hometown and attends the same school. Ped's best friend Koong then hatches a plan to get the attention of Ern and other girls. They will form a rock band! The boys are in for a bigger surprise when they learn Ern is a talented guitarist and joins their band. A talent show competition looms ahead for the band, while Ped and Koong find themselves vying for the attention of Ern ....	Netflix	https://www.youtube.com/watch?v=GEgbtJV1D7w	0	farhan	8	\N	\N
152	Seasons change: Phror arkad plian plang boi	\N	 https://xl.movieposterdb.com/12_02/2006/880477/xl_880477_1c18464f.jpg	2006	The story takes place at the College of Music, Mahidol University over one year and covers the three seasons that Bangkok typically experiences - summer, winter and monsoon. It chronicles the life of a young high school student, Pom, and his impulsive decision to attend a music school, unknown to his parents, because of a girl he has secretly liked for three years, Dao. At the music school, he befriends Aom, who eventually becomes his best friend at the academy. As a talented rock drummer he aids a wise Japanese instructor, Jitaro in research. He also forms a rock band with two friends, Ched and Chat. However, in order to become closer to the talented violinist Dao, he joins the orchestra and is assigned by the feisty conductor, Rosie, to play timpani. Eventually, as time schedule collides, he is forced to choose between playing in a rock band or the orchestra, and is also forced to choose between his crush on Dao, or his best friend, Aom.	Netflix	https://www.youtube.com/watch?v=ophEFZt9iiU	0	farhan	8	\N	\N
153	Rot fai faa... Maha na ter	\N	https://xl.movieposterdb.com/11_04/2009/1621642/xl_1621642_8ef2bf4a.jpg	2009	An urban love story set in the center of Bangkok where 30-year-old Mei Li is struggling to find true love. When Mei Li accidentally meets a handsome BTS engineer whom she considers the right man, she plans to make her first move. Though too many obstacles keep popping up, Mei Li will never give up.	Netflix	https://www.youtube.com/watch?v=ZSMUF8izOJM	0	farhan	8	\N	\N
\.


--
-- Data for Name: drama_actor; Type: TABLE DATA; Schema: public; Owner: myuser
--

COPY public.drama_actor (drama_id, actor_id) FROM stdin;
1	0
1	1
11	2
11	3
11	4
11	5
11	6
12	7
12	8
12	9
78	13
78	14
78	15
112	10
112	11
112	12
178	14
176	14
176	12
177	4
177	14
179	4
\.


--
-- Data for Name: drama_award; Type: TABLE DATA; Schema: public; Owner: myuser
--

COPY public.drama_award (drama_id, award_id) FROM stdin;
4	1
5	2
6	3
7	4
8	5
9	6
10	7
11	8
12	9
13	10
14	11
16	12
17	13
17	14
17	15
18	16
19	17
20	18
21	19
22	20
23	21
24	22
25	23
26	24
27	25
28	26
28	27
29	28
29	29
43	30
54	31
54	32
55	33
55	34
55	35
55	36
56	37
56	38
57	39
57	40
57	41
58	42
58	43
58	44
59	45
59	46
60	47
61	48
62	49
62	50
68	51
68	52
68	53
69	54
70	55
71	56
72	57
73	58
74	59
75	60
76	61
77	62
78	63
79	64
80	65
81	66
82	67
83	68
84	69
85	70
86	71
87	72
93	73
93	74
94	75
96	76
96	77
96	78
96	79
96	80
97	81
97	82
103	83
104	84
108	85
108	86
110	87
110	88
110	89
111	90
111	91
111	92
111	93
113	94
114	95
114	96
114	97
114	98
115	99
115	100
115	101
116	102
117	103
117	104
117	105
117	106
117	107
117	108
117	109
117	110
128	111
129	112
130	113
131	114
132	115
\.


--
-- Data for Name: drama_genre; Type: TABLE DATA; Schema: public; Owner: myuser
--

COPY public.drama_genre (drama_id, genre_id) FROM stdin;
0	0
0	1
0	2
1	3
2	4
2	0
3	3
3	2
3	4
3	6
4	3
4	2
4	4
4	0
5	3
5	7
5	8
5	9
6	3
6	1
6	8
6	9
7	3
7	1
7	8
7	9
8	3
8	1
8	7
8	8
9	3
9	1
9	8
9	9
10	3
10	10
10	11
10	8
11	4
11	7
11	9
12	2
12	4
12	0
13	6
13	4
13	7
13	9
14	4
14	8
14	9
15	0
15	4
15	12
15	2
16	3
16	4
16	13
16	6
16	2
17	8
17	14
17	15
17	7
17	4
18	16
18	3
18	8
18	7
18	9
19	11
19	3
19	1
19	17
20	11
20	3
20	18
21	10
21	11
21	3
22	11
22	19
22	1
22	17
23	4
24	20
24	7
24	15
25	18
25	1
25	21
25	3
25	17
26	15
26	7
26	22
26	9
26	4
27	21
27	2
27	1
27	17
28	1
28	23
28	17
29	1
29	23
29	17
29	7
30	3
30	1
30	6
30	7
30	9
31	18
31	3
31	6
31	7
31	9
32	18
32	3
32	6
32	7
32	9
33	18
33	3
33	6
33	7
33	9
34	18
34	3
34	6
34	7
34	9
35	3
35	6
35	9
36	3
36	6
36	9
37	3
37	6
37	9
38	3
38	6
38	9
39	4
39	17
39	1
39	3
39	24
40	4
40	17
40	1
40	3
40	24
41	4
41	17
41	1
41	3
41	24
42	24
42	1
42	17
42	25
43	2
43	4
43	26
43	0
44	18
44	3
44	1
44	17
45	18
45	3
45	1
45	17
46	18
46	3
46	1
46	17
47	18
47	3
47	1
47	17
48	18
48	3
48	1
48	17
49	18
49	1
49	2
49	23
49	17
50	18
50	1
50	2
50	23
50	17
51	18
51	1
51	2
51	23
51	17
52	18
52	1
52	2
52	23
52	17
53	2
53	23
54	4
54	0
55	0
55	2
55	4
55	27
56	28
56	23
56	29
56	30
57	31
57	4
57	32
58	8
58	3
58	1
58	4
59	33
59	3
59	1
59	4
59	17
60	33
60	3
60	1
60	4
60	17
61	33
61	3
61	1
61	4
61	17
62	34
62	3
62	4
62	8
62	35
63	2
63	6
63	4
63	7
63	9
64	7
64	9
65	4
65	0
66	6
66	4
67	4
67	7
67	8
68	33
68	17
68	1
68	36
68	4
69	37
69	38
69	39
69	4
69	15
70	33
70	4
70	40
70	23
70	0
71	38
71	39
71	41
71	42
71	4
72	43
72	6
72	4
72	17
73	1
73	3
73	2
74	1
74	3
74	2
74	9
75	4
75	7
75	9
76	6
76	3
77	2
77	8
77	1
78	0
78	21
79	0
79	21
79	2
80	4
80	21
80	23
81	0
81	4
82	44
82	4
82	23
83	3
83	1
83	8
84	3
84	1
84	8
85	3
85	1
85	8
86	3
86	1
86	8
87	3
87	1
87	8
88	3
88	1
88	6
88	7
88	18
89	3
89	1
89	6
89	7
89	18
90	3
90	1
90	6
90	7
90	18
91	3
91	1
91	6
91	7
91	18
92	3
92	1
92	6
92	7
92	18
93	4
93	17
93	15
93	7
93	9
94	4
94	32
94	0
95	4
95	15
95	7
95	8
95	9
96	31
96	4
96	26
97	2
98	3
98	1
98	2
98	23
98	8
99	3
99	1
99	2
99	23
99	8
100	3
100	1
100	2
100	23
100	8
101	3
101	1
101	2
101	23
101	8
102	3
102	1
102	2
102	23
102	8
103	0
103	17
103	4
103	2
103	45
104	40
104	23
104	0
104	4
104	2
105	4
105	40
105	0
106	9
106	7
106	6
106	4
107	46
107	3
107	4
107	9
107	17
108	47
108	3
108	1
108	8
109	47
109	3
109	1
109	8
110	48
110	49
110	7
110	9
111	3
111	1
111	6
111	4
111	7
112	3
112	9
113	2
113	0
113	26
114	6
114	4
114	7
115	31
115	4
115	6
116	17
116	18
116	23
117	6
117	9
117	4
118	18
118	7
118	1
118	9
118	6
119	18
119	7
119	1
119	9
119	6
120	2
120	23
121	2
121	23
122	2
122	23
123	18
123	1
123	2
123	6
123	50
124	18
124	1
124	2
124	6
124	50
125	18
125	1
125	2
125	6
125	50
126	18
126	1
126	2
126	6
126	50
127	18
127	1
127	2
127	6
127	50
128	3
128	1
128	17
129	3
129	1
129	17
130	3
130	1
130	17
131	3
131	1
131	17
132	3
132	1
132	17
133	33
133	2
133	0
134	18
134	3
134	8
135	2
135	0
135	51
136	3
136	4
136	52
137	15
137	7
137	9
138	3
138	1
138	17
138	0
139	3
139	1
139	17
139	0
140	3
140	1
140	17
140	0
141	3
141	1
141	17
141	0
142	3
142	1
142	17
143	4
143	0
143	40
144	4
144	0
144	2
145	3
145	6
145	9
145	7
145	4
146	3
146	1
146	53
147	3
147	1
147	53
148	3
148	1
148	53
149	2
149	15
150	4
150	0
150	2
151	2
151	26
151	0
152	2
152	4
152	26
152	0
153	2
153	0
153	4
177	15
177	48
179	3
179	6
179	34
\.


--
-- Data for Name: dramav2; Type: TABLE DATA; Schema: public; Owner: myuser
--

COPY public.dramav2 (id, title, alternative_title, url_photo, year, synopsis, availability, link_trailer, status, created_by, country_id, actors) FROM stdin;
0	Crash Landing on You	\N	https://upload.wikimedia.org/wikipedia/id/6/64/Crash_Landing_on_You_main_poster.jpg	2019	The absolute top secret love story of a chaebol heiress who made an emergency landing in North Korea because of a paragliding accident and a North Korean special officer who falls in love with her and who is hiding and protecting her.	Netflix 	https://youtu.be/GVQGWgeVc4k?si=52NMaAQYHKXEtxPT	0	farhan	0	Hyun Bin, Son Ye-jin, \nSeo Ji-hye, \nKim Jung-hyun, \nYang Kyung-won, Yoo Su-bin, Lee Sin-young, \nTang Joon-sang, Kim Jung-nan
1	The Goblin	\N	https://upload.wikimedia.org/wikipedia/id/6/69/Golbin_Poster.jpg	2021	Former gangster Doo-hyun, known as Goblin, served time for his boss' murder to protect Young-min. Out of prison, Young-min kidnaps Doo-hyun's daughter, forcing him to seek vengeance and reclaim his Goblin persona.	Netflix 	https://youtu.be/vSQ-2incUEM?si=YkoqreKTEvOwRMHz	0	farhan	0	Cho Dong-hyuk, Wan Lee, \nYoon Song-a
2	Itaewon Class	\N	https://upload.wikimedia.org/wikipedia/id/f/f9/Itaewon_Class_poster.jpg	2020	An ex-con opens a street bar in Itaewon, while also seeking revenge on the family who was responsible for his father's death.	Netflix 	https://youtu.be/NNP8m3gaaFE?si=naxieCcmL1ZoCZjp	0	farhan	0	Park Seo-joon, Kim Da-mi, Yoo Jae-Myung, Nara, Ahn Bo-hyun, Lee Joo-young, Kim Hye-Eun, Kim Dong-Hee, Ryu Kyung-soo
3	Vincenzo	\N	https://awsimages.detik.net.id/community/media/visual/2021/03/01/vincenzo-1.png	2021	During a visit to his motherland, a Korean-Italian Mafia lawyer gives an unrivaled conglomerate a taste of its own medicine with a side of justice.	Netflix 	https://youtu.be/_J8tYxYB_YU?si=YnLEiQpH7CLVECMW	0	farhan	0	Song Joong-ki, Jeon Yeo-been, Taecyeon, Kwak Dong-yeon, Wyatt Bowen, Yoon Byung-hee, Kim Yoon-hye, Kim Yeo-jin, Jo Han-chul
4	Descendants of the Sun	\N	https://upload.wikimedia.org/wikipedia/id/6/6e/DescendantsoftheSun.jpg	2016	This drama tells of the love story that develops between a surgeon and a special forces officer.	Netflix 	https://youtu.be/XyzaMpAVm3s?si=C9-C3laIbJZ3tS6w	0	farhan	0	Song Joong-ki, Song Hye-kyo, Jin Goo, Kim Ji-won, Kim Min-Seok, Kang Shin-il, Ahn Bo-hyun, Seo Jung-yeon, Park Hoon
5	The Maze Runner	\N	https://posters.movieposterdb.com/14_08/2014/1790864/s_1790864_fe41cf34.jpg	2014	Awakening in an elevator, remembering nothing of his past, Thomas emerges into a world of about thirty teenage boys, all without past memories, who have learned to survive under their own set of rules in a completely enclosed environment, subsisting on their own agriculture and supplies. With a new boy arriving every thirty days, the group has been in The Glade for three years, trying to find a way to escape through the Maze that surrounds their living space (patrolled by cyborg monsters named 'Grievers'). They have begun to give up hope when a comatose girl arrives with a strange note, and their world begins to change with the boys dividing into two factions: those willing to risk their lives to escape and those wanting to hang onto what they've got and survive.—KelseyJ	Netflix 	https://youtu.be/AwwbhhjQ9Xk?si=PJjZKZH7amEgeBhA	0	farhan	1	Dylan O'Brien, Ki Hong Lee, Thomas Brodie-Sangster, Will Poulter, Kaya Scodelario, Aml Ameen, Blake Cooper
6	The Maze Runner: Scorch Trials	\N	https://posters.movieposterdb.com/15_05/2015/4046784/s_4046784_cbb64415.jpg	2015	The second chapter of the epic Maze Runner saga. Thomas (Dylan O'Brien) and his fellow Gladers face their greatest challenge yet: searching for clues about the mysterious and powerful organization known as WCKD. Their journey takes them to the Scorch, a desolate landscape filled with unimaginable obstacles. Teaming up with resistance fighters, the Gladers take on WCKD's vastly superior forces and uncover its shocking plans for them all.—20th Century Fox	Netflix 	https://youtu.be/-44_igsZtgU?si=7ufXYEqfDzdeZRy2	0	farhan	1	Dylan O'Brien, Ki Hong Lee, Thomas Brodie-Sangster, Kaya Scodelario, Jacob Lofland, Rosa Salazar, Giancarlo Esposito
7	Maze Runner: The Death Cure	\N	https://posters.movieposterdb.com/20_06/2018/4500922/s_4500922_2663b144.jpg	2018	In the epic finale to The Maze Runner Saga, Thomas leads his group of escaped Gladers on their final and most dangerous mission yet. To save their friends, they must break into the legendary last city, a WCKD controlled labyrinth that may turn out to be the deadliest maze of all. Anyone who makes it out alive will get the answers to the questions the Gladers have been asking since they first arrived in the maze. Will Thomas and the crew make it out alive? Or will Ava Paige get her way?	Netflix 	https://youtu.be/4-BTxXm8KSg?si=RHS5aQagm2ylIRLq	0	farhan	1	Dylan O'Brien, Ki Hong Lee, Thomas Brodie-Sangster, Kaya Scodelario, Jacob Lofland, Rosa Salazar, Giancarlo Esposito, Will Poulter
8	Divergent	\N	https://posters.movieposterdb.com/14_03/2014/1840309/s_1840309_2f948395.jpg	2014	In a world divided by factions based on virtues, Tris learns she's Divergent and won't fit in. When she discovers a plot to destroy Divergents, Tris and the mysterious Four must find out what makes Divergents dangerous before it's too late.	Netflix 	https://youtu.be/Aw7Eln_xuWc?si=k4I06AV1XEC1TYzb	0	farhan	1	Shailene Woodley, Theo James, Kate Winslet, Jai Courtney, Ray Stevenson, Ashley Judd
9	Insurgent	The Divergent Series: Insurgent	https://posters.movieposterdb.com/15_01/2015/2908446/s_2908446_b96edb43.jpg	2015	Beatrice Prior must confront her inner demons and continue her fight against a powerful alliance which threatens to tear her society apart with the help from others on her side.	Netflix 	https://youtu.be/OBn_LRp-D7U?si=PozBNB6ftInKVdDe	0	farhan	1	Shailene Woodley, Theo James, Ansel Elgort, Jai Courtney, Tony Goldwyn
10	The Boys	\N	https://posters.movieposterdb.com/20_01/2019/1190634/l_1190634_22fcc492.jpg	2019	A group of vigilantes set out to take down corrupt superheroes who abuse their superpowers.	Amazon Prime	https://www.youtube.com/watch?v=5SKP1_F7ReE	0	farhan	1	Karl Urban, Jack Quaid, Antony Starr, Erin Moriarty, Jessie T. Usher, Laz Alonso, Chace Crawford, Tomer Capone, Karen Fukuhara
11	13 Reasons Why	\N	https://posters.movieposterdb.com/21_02/2017/1837492/s_1837492_8fa1eebf.jpg	2017	Follows teenager Clay Jensen, in his quest to uncover the story behind his classmate and crush, Hannah, and her decision to end her life.	Netflix	https://www.youtube.com/watch?v=QkT-HIMSrRk	0	farhan	1	Dylan Minnette, Christian Navarro, Alisha Boe, Brandon Flynn, Justin Prentice, Ross Butler, Devin Druid, Amy Hargreaves, Miles Heizer
12	500 days of summer	\N	https://posters.movieposterdb.com/09_10/2009/1022603/l_1022603_997c5a61.jpg	2009	After being dumped by the girl he believes to be his soulmate, hopeless romantic Tom Hansen reflects on their relationship to try and figure out where things went wrong and how he can win her back.	Netflix	https://www.youtube.com/watch?v=PsD0NpFSADM	0	farhan	1	Joseph Gordon-Levitt, Zooey Deschanel, Geoffrey Arend, Chloë Grace Moretz, Matthew Gray Gubler, Clark Gregg, Patricia Belcher, Rachel Boston, Minka Kelly
27	Wonka	\N	https://awsimages.detik.net.id/community/media/visual/2023/12/08/film-wonka-2.jpeg?w=600&q=90	2023	Armed with nothing but a hatful of dreams, young chocolatier Willy Wonka manages to change the world, one delectable bite at a time.	Netflix	https://youtu.be/otNh9bTjXWg	0	farhan	1	Timothée Chalamet, Hugh Grant, Rowan Atkinson, Olivia Colman, Calah Lane
13	Sherlock	\N	https://posters.movieposterdb.com/10_08/2010/1475582/l_1475582_6c4d4dac.jpg	2010	The quirky spin on Conan Doyle's iconic sleuth pitches him as a high-functioning sociopath in modern-day London. Assisting him in his investigations: Afghanistan War vet John Watson, who's introduced to Holmes by a mutual acquaintance.	Amazon Prime	https://www.youtube.com/watch?v=gGqWqGOSTGQ	0	farhan	1	Benedict Cumberbatch, Martin Freeman, Una Stubbs, Rupert Graves, Louise Brealey, Mark Gatiss, Andrew Scott, Amanda Abbington, Jonathan Aris
14	The Butterfly Effect	\N	https://posters.movieposterdb.com/12_11/2004/289879/s_289879_365cbc14.jpg	2004	Evan Treborn suffers blackouts during significant events of his life. As he grows up, he finds a way to remember these lost memories and a supernatural way to alter his life by reading his journal.	Netiflix	https://www.youtube.com/watch?v=LOS5YgJkjZ0	0	farhan	1	Ashton Kutcher, Melora Walters, Amy Smart, Elden Henson, William Lee Scott, John Patrick Amedori, Irina Gorovaia, Kevin G. Schmidt, Jesse James
15	Twenty Five Twenty One	Seumuldaseot Seumulhana	https://posters.movieposterdb.com/23_03/2022/17513352/l_twenty-five-twenty-one-movie-poster_83675ed1.jpg	2022	In a time when dreams seem out of reach, a teen fencer pursues big ambitions and meets a hardworking young man who seeks to rebuild his life. At 22 and 18, they say each other's names for the first time, at 25 and 21, they fall in love.	Netflix	https://youtu.be/n7F8o-SoK8s?feature=shared	0	farhan	0	Kim Tae-Ri, Nam Joo-Hyuk, Kim Ji-yeon, Choi Hyun-Wook, Lee Joo-Myoung, Seo Jae Hee, Kim Hye Eun, Joo Bo Young, Lee Yea Jin
16	Mencuri Raden Saleh	Stealing Raden Saleh	https://posters.movieposterdb.com/23_02/2022/13484872/l_mencuri-raden-saleh-movie-poster_56681bfe.jpg	2022	To save his father, a master forger sets out to steal an invaluable painting with the help of a motley crew of specialists.	Netflix	https://youtu.be/DN3sRz_veBU?feature=shared	0	farhan	2	Iqbaal Dhiafakhri Ramadhan, Angga Yunanda, Rachel Amanda, Umay Shahab, Aghniny Haque, Ari Irham, Ganindra Bimo, Andrea Dian, Tio Pakusadewo
17	Stranger Things	\N	https://posters.movieposterdb.com/22_12/2016/4574334/l_stranger-things-movie-poster_5e41833a.jpg	2016	In 1980s Indiana, a group of young friends witness supernatural forces and secret government exploits. As they search for answers, the children unravel a series of extraordinary mysteries.	Netflix	https://youtu.be/mnd7sFt5c3A?feature=shared	0	farhan	1	Millie Bobby Brown, Finn Wolfhard, Winona Ryder, David Harbour, Gaten Matarazzo, Caleb McLaughlin, Natalia Dyer, Charlie Heaton, Noah Schnapp
18	Alice in BorderLand	Imawa no Kuni no Arisu	https://posters.movieposterdb.com/23_01/2020/10795658/l_alice-in-borderland-movie-poster_5e9fac9b.jpg	2020	Obsessed gamer Arisu suddenly finds himself in a strange, emptied-out version of Tokyo in which he and his friends must compete in dangerous games in order to survive.	Netflix	https://youtu.be/49_44FFKZ1M?feature=shared	0	farhan	3	Kento Yamazaki, Tao Tsuchiya, Nijirô Murakami, Eleanor Noble, Daniel Rindress-Kay, Aya Asahina, Daniel Brochu, Juliette Gosselin, Yûtarô Watanabe
19	Moon Knight	\N	https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/D57E6C2B5AC51D335FF7DF86DCA0E76A1AACBC5638033ADF97B28E8E480B011B/scale?width=506&amp;aspectRatio=2.00&amp;format=webp	2022	Steven Grant discovers he's been granted the powers of an Egyptian moon god. But he soon finds out that these newfound powers can be both a blessing and a curse to his troubled life.	Disney+	https://www.youtube.com/watch?v=x7Krla_UxRg	0	farhan	1	Oscar Isaac, Ethan Hawke, May Calamawy, Michael Benjamin Hernandez, F. Murray Abraham, Ann Akinjirin, Karim El Hakim, David Ganly.
20	What If...?	\N	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLXdZZt0GwN7zCAJcnsbbvYM2mvKYlcYwC3Q&s	2021	Exploring pivotal moments from the Marvel Cinematic Universe and turning them on their head, leading the audience into uncharted territory.	Disney+	https://www.youtube.com/watch?v=x9D0uUKJ5KI	0	farhan	1	Jeffrey Wright, Terri Douglas, Matthew Wood, Robin Atkin Downes, Fred Tatasciore, Mick Wingert, Josh Keaton, Helen Sadler.
21	Deadpool 2	\N	https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.marvel.com%2Fmovies%2Fdeadpool-2&psig=AOvVaw2dKlUvctklnBFvnhyfFDAw&ust=1724739856343000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCOC12PCCkogDFQAAAAAdAAAAABAR	2018	Foul-mouthed mutant mercenary Wade Wilson (a.k.a. Deadpool) assembles a team of fellow mutant rogues to protect a young boy with abilities from the brutal, time-traveling cyborg Cable.	Disney+	https://youtu.be/20bpjtCbCz0	0	farhan	1	Ryan Reynolds, Josh Brolin, Morena Baccarin, Julian Dennison, Zazie Beetz, T.J. Miller, Brianna Hildebrand, Jack Kesy
22	Loki	\N	https://cinemags.org/wp-content/uploads/2021/05/loki-poster.jpg	2021	The mercurial villain Loki resumes his role as the God of Mischief in a new series that takes place after the events of “Avengers: Endgame.”	Disney+	https://www.youtube.com/watch?v=nW948Va-l10	0	farhan	1	Tom Hiddleston, Sophia Di Martino, Gugu Mbatha-Raw, Wunmi Mosaku, Eugene Cordero, Rafael Casal, Tara Strong, Kate Dickie, Liz Carr, Neil Ellice, with Jonathan Majors, Ke Huy Quan and Owen Wilson
23	The Good Doctor	\N	https://m.media-amazon.com/images/M/MV5BNjMwNDNkMzEtNzRmNy00YmExLTg3ZWYtM2NjMjFjNWY3MmM0XkEyXkFqcGdeQXVyMTY0Njc2MTUx._V1_FMjpg_UX1000_.jpg	2017	Shaun Murphy, a young surgeon with autism and savant syndrome, relocates from a quiet country life to join a prestigious hospital surgical unit. Alone in the world and unable to personally connect with those around him, Shaun uses his extraordinary medical gifts to save lives and challenge the skepticism of his colleagues.	Netflix	https://youtu.be/lnY9FWUTY84	0	farhan	1	Freddie Highmore, Antonia Thomas, Paige Spara, Fiona Gubelmann, Richard Schiff
24	The Outsider	\N	https://m.media-amazon.com/images/M/MV5BNzgxOTc4ODctNDNhZC00M2UzLTgyYzgtM2Q2OTk3NmQ5NTljXkEyXkFqcGdeQXVyMzQ2MDI5NjU@._V1_.jpg	2020	Terry Maitland, a suburban parent, is accused of a grisly murder. Detective Ralph Anderson struggles to solve the bizarre case as he finds some conflicting clues.	HBO	https://www.youtube.com/watch?v=fiVukc-yNFY  	0	farhan	1	Ben Mendelsohn, Cynthia Erivo, Bill Camp, Paddy Considine, Julianne Nicholson
25	Moana	\N	https://upload.wikimedia.org/wikipedia/id/thumb/2/26/Moana_Teaser_Poster.jpg/220px-Moana_Teaser_Poster.jpg	2016	Moana, daughter of chief Tui, embarks on a journey to return the heart of goddess Te Fitti from Maui, a demigod, after the plants and the fish on her island start dying due to a blight.	Disney+	https://youtu.be/LKFuXETZUsI	0	farhan	1	Auliʻi Cravalho, Dwayne Johnson, Alan Tudyk, Jemaine Clement, Lin-Manuel Miranda
26	Five Night At Freddy	\N	https://upload.wikimedia.org/wikipedia/en/thumb/d/d6/Five_Nights_At_Freddy%27s_poster.jpeg/220px-Five_Nights_At_Freddy%27s_poster.jpeg	2023	A troubled security guard begins working at Freddy Fazbear's Pizzeria. While spending his first night on the job, he realizes the late shift at Freddy's won't be so easy to make it through.	Netflix	https://youtu.be/0VH9WCFV6XQ	0	farhan	1	Josh Hutcherson, Elizabeth Lail, Matthew Lillard, Piper Rubio, MatPat
28	Harry Potter and The Sorcerer’s Stone	\N	https://m.media-amazon.com/images/M/MV5BNmQ0ODBhMjUtNDRhOC00MGQzLTk5MTAtZDliODg5NmU5MjZhXkEyXkFqcGdeQXVyNDUyOTg3Njg@._V1_.jpg	2001	An orphaned boy enrolls in a school of wizardry, where he learns the truth about himself, his family and the terrible evil that haunts the magical world.	Amazon Prime Video, Netflix, Google Play Movies	https://youtu.be/VyHV0BRtdxo?si=N2ih8rFKoiAkckUf	0	farhan	4	Daniel Radcliffe, Rupert Grint, Emma Watson, Richard Harris, Maggie Smith, Robbie Cltrane,Fiona Shar,  Harry Melling, Ian Hart
29	Harry Potter and The Chamber of Secrets	\N	https://m.media-amazon.com/images/M/MV5BMjE0YjUzNDUtMjc5OS00MTU3LTgxMmUtODhkOThkMzdjNWI4XkEyXkFqcGdeQXVyMTA3MzQ4MTc0._V1_.jpg 	2002	Harry Potter lives his second year at Hogwarts with Ron and Hermione when a message on the wall announces that the legendary Chamber of Secrets has been opened. The trio soon realize that, to save the school, it will take a lot of courage.	Amazon Prime Video, Netflix, Google Play Movies	https://youtu.be/nE11U5iBnH0?si=-CH0iV5bZbi80wrM	0	farhan	4	Daniel Radcliffe, Rupert Grint, Emma Watson, Richard Harris, Maggie Smith, Robbie Cltrane,Fiona Shar,  Harry Melling, Ian Hart
30	Meitantei Konan Kurogane no Sabumarin	Detective Conan: Black Iron Submarine	https://www.movieposterdb.com/detective-conan-black-iron-submarine-i27521477	2023	Many engineers from around the world gather at the Interpol marine facility Pacific Buoy on Hachijo-jima, in the sea south of central Tokyo Prefecture coast, to witness the launch of a new system that connects all law enforcement camera systems around the world and enables facial recognition worldwide. Conan, along with his friends Kogoro, Ran, Agasa, Haibara, and the Detective Boys, also heads to the island with an invitation from Sonoko to see the whales. He receives a message from Subaru, who says that a Europol agent has been murdered in Germany by Gin. Perturbed, Conan sneaks onto the police ship led by Kuroda, which is bringing them to the island to protect the completion work, and tours the new facility, just in time for the Black Organization to kidnap a female engineer, seeking a piece of important data in her USB drive. A terrifying howl of screws is heard from the ocean as an unknown person approaches Haibara.	Cacthplay	https://www.youtube.com/watch?v=0rNpSmVmN2U	0	farhan	3	Minami Takayama, Wakana Yamazaki, Rikiya Koyama, Megumi Hayashibara, Yukiko Iwai, Ikue Otani, Wataru Takagi, Chafurin, Kenichi Ogata.
31	Meitantei Conan: Halloween no Hanayome	Detective Conan: The Bride of Halloween	https://www.movieposterdb.com/detective-conan-the-bride-of-halloween-i19770970	2022	During the wedding of Takagi and Sato, an assailant breaks and tries to attack Sato. But Takagi protects her while getting injured. The attacker escapes, but the situation is settled, although Sato is rightfully rattled by it all.	Netflix, Bstation	https://www.youtube.com/watch?v=LzCD9wPNd6A	0	farhan	3	Minami Takayama, Wakana Yamazaki, Rikiya Koyama, Megumi Hayashibara, Nobutoshi Canna, Atsuko Yuya, Fumihiko Tachiki, Ikue Otani, Kenichi Ogata.
32	Meitantei Conan: Tokei-jikake no matenrou	Detective Conan: The Time-Bombed Skyscraper	https://www.movieposterdb.com/meitantei-conan-tokei-jikake-no-matenrou-i131479	1997	Detective Shinichi Kudo was once a brilliant teenage detective until he was given a poison that reverted him to a 4 year old. He's taken the name Conan Edogawa so no one (except an eccentric inventor) will know the truth. Now he's got to solve a series of bombings before his loved ones become victims. Who is this madman and why is he doing this. Only the young genius can save the day but will even he be up to the task?	Netflix, Bstation	https://www.youtube.com/watch?v=N4CP6BMyn2s	0	farhan	3	Minami Takayama, Wakana Yamazaki, Akira Kamiya, Yukiko Iwai, Wataru Takagi, Chafurin, Kenichi Ogata, Kappei Yamaguchi, Megumi Hayashibara.
33	Meitantei Conan: 14 banme no target	Detective Conan: The Fourteenth Target	https://www.movieposterdb.com/meitantei-conan-14-banme-no-target-i965649	1998	an’s secret past revealed! Ten years ago, something happened between her mom and dad. Now, plagued by nightmares, Ran is starting to remember… Meanwhile, a murderous card dealer breaks out of jail to seek revenge. His target: Ran’s father. Can Conan stop him in time and save his girlfriend’s family?	Netflix, Bstation	https://www.youtube.com/watch?v=BlJsEmOWQ1E	0	farhan	3	Minami Takayama, Wakana Yamazaki, Akira Kamiya, Wataru Takagi, Kappei Yamaguchi, Chafurin, Kenichi Ogata, Naoko Matsui, Megumi Hayashibara.
34	Meitantei Conan: Meikyuu no crossroad	Detective Conan: Crossroad in the Ancient Capital	https://www.movieposterdb.com/meitantei-conan-meikyuu-no-crossroad-i1133935	2003	As the police struggle to find a lead, a Kyoto temple seeks the renowned detective Kogorou Mouri's help after receiving a mysterious puzzle. Joined by the young sleuth Conan Edogawa and high school detective Heiji Hattori, they embark on a quest to decipher the riddle, unravel the killer's identity, and confront their shared pasts.	Netflix, Bstation	https://www.youtube.com/watch?v=OEWgyMspNR4	0	farhan	3	Minami Takayama, Wakana Yamazaki, Akira Kamiya, Kappei Yamaguchi, Kenichi Ogata, Megumi Hayashibara, Rikiya Koyama, Naoko Matsui, Chafurin.
35	The Fast and the Furious: Tokyo Drift	\N	https://posters.movieposterdb.com/06_07/2006/0463985/l_121979_0463985_7f210517.jpg	2006	A teenager becomes a major competitor in the world of drift racing after moving in with his father in Tokyo to avoid a jail sentence in America.	Prime Video	https://www.youtube.com/watch?v=p8HQ2JLlc4E	0	farhan	1	Lucas Black, Zachery Ty Bryan, Shad Moss
36	The Fast and Furious 6	\N	https://posters.movieposterdb.com/13_04/2013/1905041/l_1905041_1f36429c.jpg	2013	Hobbs has Dominic and Brian reassemble their crew to take down a team of mercenaries: Dominic unexpectedly gets convoluted also facing his presumed deceased girlfriend, Letty.	Prime Video	https://www.youtube.com/watch?v=oc_P11PNvRs	0	farhan	1	Vin Diesel, Paul Walker, Dwayne Johnson
37	Fast Five	\N	https://posters.movieposterdb.com/11_04/2011/1596343/l_1596343_63064b8e.jpg	2011	Dominic Toretto and his crew of street racers plan a massive heist to buy their freedom while in the sights of a powerful Brazilian drug lord and a dangerous federal agent.	Prime Video	https://www.youtube.com/watch?v=vcn2GOuZCKI	0	farhan	1	Vin Diesel, Paul Walker, Dwayne Johnson
38	Furious 7	\N	https://posters.movieposterdb.com/22_05/2009/940657/l_940657_2a184c06.jpg	2015	Deckard Shaw seeks revenge against Dominic Toretto and his family for his comatose brother.	Prime Video	https://www.youtube.com/watch?v=Skpu5HaVkOc	0	farhan	1	Vin Diesel, Paul Walker, Jason Statham
58	Dune	\N	https://upload.wikimedia.org/wikipedia/id/5/5e/DunePartPost2021.jpg	2021	A mythic and emotionally charged hero's journey, Dune tells the story of Paul Atreides, a brilliant and gifted young man born into a great destiny beyond his understanding, who must travel to the most dangerous planet in the universe to ensure the future of his family and his people.	Netflix, Apple TV, Prime Video	https://youtu.be/n9xhJrPXop4?si=mdFM9kcL4HOuMGS_	0	farhan	1	\t\nTimothée Chalamet, Rebecca Ferguson, Oscar Isaac, Josh Brolin, Stellan Skarsgård, Dave Bautista, Stephen McKinley Henderson, Zendaya
39	The Lord of the Rings: The Fellowship of the Ring	\N	lord_of_the_rings_the_fellowship_of_the_ring_2001_advance_original_film_art_50ea31a0-b4d5-489c-89e4-c494a7966b4e_5000x.jpg (1018×1500) (originalfilmart.com)	2001	An ancient Ring thought lost for centuries has been found, and through a strange twist of fate has been given to a small Hobbit named Frodo. When Gandalf discovers the Ring is in fact the One Ring of the Dark Lord Sauron, Frodo must make an epic quest to the Cracks of Doom in order to destroy it. However, he does not go alone. He is joined by Gandalf, Legolas the elf, Gimli the Dwarf, Aragorn, Boromir, and his three Hobbit friends Merry, Pippin, and Samwise. Through mountains, snow, darkness, forests, rivers and plains, facing evil and danger at every corner the Fellowship of the Ring must go. Their quest to destroy the One Ring is the only hope for the end of the Dark Lords reign	Prime Video	https://youtu.be/V75dMMIW2B4?si=FxXoVC24ce1f47mn	0	farhan	1	Elijah wood, Ian McKellen, Orlando Bloom, Sean Bean, Alan Howard, Noel Appleby, Sean Astin, Sala Baker, Billy Boyd
40	The Lord of the Rings: The Return of the King	\N	LordoftheRingsReturnoftheKing_2003_original_film_art_5000x.webp (2047×3000) (originalfilmart.com)	2003	The final confrontation between the forces of good and evil fighting for control of the future of Middle-earth. Frodo and Sam reach Mordor in their quest to destroy the One Ring, while Aragorn leads the forces of good against Sauron's evil army at the stone city of Minas Tirith.	Prime Video	https://youtu.be/r5X-hFf6Bwo?si=j2t_y_QMMrdJrr5t	0	farhan	1	Elijah wood, Ian McKellen, Orlando Bloom, Sean Bean, Alan Howard, Noel Appleby, Sean Astin, Sala Baker, Billy Boyd
41	The lord of the rings: The Two Towers	\N	lord_of_the_rings_the_two_towers_2002_original_film_art_5dd21feb-10ab-41a1-84a1-4c4b082e9626_5000x.webp (1357×2000) (originalfilmart.com)	2002	The continuing quest of Frodo and the Fellowship to destroy the One Ring. Frodo and Sam discover they are being followed by the mysterious Gollum. Aragorn, the Elf archer Legolas, and Gimli the Dwarf encounter the besieged Rohan kingdom, whose once great King Theoden has fallen under Saruman's deadly spell	Prime Video	https://youtu.be/LbfMDwc4azU?si=WVpfJHeqh8wUDcmo	0	farhan	1	Elijah wood, Ian McKellen, Orlando Bloom, Sean Bean, Alan Howard, Noel Appleby, Sean Astin, Sala Baker, Billy Boyd
42	The hobbit: an unexpected journey	\N	latest (2000×3000) (nocookie.net)	2012	Bilbo Baggins is swept into a quest to reclaim the lost Dwarf Kingdom of Erebor from the fearsome dragon Smaug. Approached out of the blue by the wizard Gandalf the Grey, Bilbo finds himself joining a company of thirteen dwarves led by the legendary warrior, Thorin Oakenshield. Their journey will take them into the Wild; through treacherous lands swarming with Goblins and Orcs, deadly Wargs and Giant Spiders, Shapeshifters and Sorcerers. Although their goal lies to the East and the wastelands of the Lonely Mountain first they must escape the goblin tunnels, where Bilbo meets the creature that will change his life forever ... Gollum. Here, alone with Gollum, on the shores of an underground lake, the unassuming Bilbo Baggins not only discovers depths of guile and courage that surprise even him, he also gains possession of Gollum's precious ring that holds unexpected and useful qualities ... A simple, gold ring that is tied to the fate of all Middle-earth in ways Bilbo cannot begin to know.	Prime Video	https://youtu.be/SDnYMbYB-nU?si=67YeVvzNZKEKsOZG	0	farhan	1	Martin Freeman, Ian McKellen, Richard Armitage, Andy Serkis, Ken Stott, Graham McTavish, William Kircher, James Nesbitt, Stephen Hunter
43	la la land	\N	uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg (2000×3000) (tmdb.org)	2016	Aspiring actress serves lattes to movie stars in between auditions and jazz musician Sebastian scrapes by playing cocktail-party gigs in dingy bars. But as success mounts, they are faced with decisions that fray the fragile fabric of their love affair, and the dreams they worked so hard to maintain in each other threaten to rip them apart	Netflix	https://youtu.be/0pdqf4P9MB8?si=qVuEeA9xFesBvS35	0	farhan	1	Ryan Gosling, Emma Stone, Rosemarie Dewitt, J.K. Simmons, Amiee Conn
44	Overlord I	\N	https://cdn.myanimelist.net/images/anime/7/88019.jpg	2015	The final hour of the popular virtual reality game Yggdrasil has come. However, Momonga, a powerful wizard and master of the dark guild Ainz Ooal Gown, decides to spend his last few moments in the game as the servers begin to shut down. To his surprise, despite the clock having struck midnight, Momonga is still fully conscious as his character and, moreover, the non-player characters appear to have developed personalities of their own! Confronted with this abnormal situation, Momonga commands his loyal servants to help him investigate and take control of this new world, with the hopes of figuring out what has caused this development and if there may be others in the same predicament.	Crunchyroll, Netflix	https://www.youtube.com/embed/3jE9moHQePI?enablejsapi=1&wmode=opaque&autoplay=1	0	farhan	3	Satoshi Hino, Yumi Hara, Masayuki Katou, Sumire Uesaka, Manami Numakura, Shigeru Chiba, Mamoru Miyano
45	Overlord II	\N	https://cdn.myanimelist.net/images/anime/1212/113415.jpg	2018	Ainz Ooal Gown, the undead sorcerer formerly known as Momonga, has accepted his place in this new world. Though it bears similarities to his beloved virtual reality game Yggdrasil, it still holds many mysteries which he intends to uncover, by utilizing his power as ruler of the Great Tomb of Nazarick. However, ever since the disastrous brainwashing of one of his subordinates, Ainz has become wary of the impending dangers of the Slane Theocracy, as well as the possible existence of other former Yggdrasil players. Meanwhile, Albedo, Demiurge and the rest of Ainz's loyal guardians set out to prepare for the next step in their campaign: Nazarick's first war… Overlord II picks up immediately after its prequel, continuing the story of Ainz Ooal Gown, his eclectic army of human-hating guardians, and the many hapless humans affected by the Overlord's arrival.	Crunchyroll, Netflix	https://www.youtube.com/embed/p2ksX48PBQY?enablejsapi=1&wmode=opaque&autoplay=1	0	farhan	3	Satoshi Hino, Yumi Hara, Masayuki Katou, Sumire Uesaka, Manami Numakura, Shigeru Chiba, Mamoru Miyano
46	Overlord III	\N	https://cdn.myanimelist.net/images/anime/1511/93473.jpg	2018	Following the horrific assault on the Re-Estize capital city, the Guardians of the Great Tomb of Nazarick return home to their master Ainz Ooal Gown. After months of laying the groundwork, they are finally ready to set their plans of world domination into action. As Ainz's war machine gathers strength, the rest of the world keeps moving. The remote Carne Village, which Ainz once saved from certain doom, continues to prosper despite the many threats on its doorstep. And in the northeastern Baharuth Empire, a certain Bloody Emperor sets his sights on the rising power of Nazarick. Blood is shed, heroes fall, and nations rise. Can anyone, or anything, challenge the supreme power of Ainz Ooal Gown?	Crunchyroll, Netflix	https://www.youtube.com/embed/awYU-9jVZxE?enablejsapi=1&wmode=opaque&autoplay=1	0	farhan	3	Satoshi Hino, Yumi Hara, Masayuki Katou, Sumire Uesaka, Manami Numakura, Shigeru Chiba, Mamoru Miyano
47	Overlord IV	\N	https://cdn.myanimelist.net/images/anime/1530/120110.jpg	2022	E-Rantel, the capital city of the newly established Sorcerer Kingdom, suffers from a dire shortage of goods. Once a prosperous city known for its trade, it now faces a crisis due to its caution—or even fear—of its king, Ainz Ooal Gown. To make amends, Ainz sends Albedo to the city as a diplomatic envoy. Meanwhile, the cardinals of the Slane Theocracy discuss how to retaliate against Ainz after his attack crippled the Re-Estize Kingdom's army, plotting for the Baharuth Empire to take over the Sorcerer Kingdom. However, when Emperor Jircniv Rune Farlord El Nix arranges a meeting with the Theocracy's messengers at a colosseum, he is confronted by none other than Ainz himself. With their secret gathering now out in the open, the emperor and his guests learn that Ainz has challenged the Warrior King, the empire's greatest fighter, to a duel. With Ainz's motivations beyond his comprehension, Jircniv can do nothing but watch as humanity's future changes before his very eyes.	Crunchyroll, Netflix	https://www.youtube.com/embed/tNYQjEyTO6s?enablejsapi=1&wmode=opaque&autoplay=1	0	farhan	3	Satoshi Hino, Yumi Hara, Masayuki Katou, Sumire Uesaka, Manami Numakura, Shigeru Chiba, Mamoru Miyano
48	Overlord: The Sacred Kingdom	Overlord Movie 3: Sei Oukoku-hen	https://cdn.myanimelist.net/images/anime/1954/144101.jpg	2024	The Sacred Kingdom has enjoyed a great many years without war thanks to a colossal wall constructed after a historic tragedy. They understand best how fragile peace can be. When the terrible demon Jaldabaoth takes to the field at the head of a united army of monstrous tribes, the Sacred Kingdom's leaders know their defenses are not enough. With the very existence of the country at stake, the pious have no choice but to seek help wherever they can get it, even if it means breaking taboo and parlaying with the undead king of the Nation of Darkness!	Crunchyroll, Netflix	https://www.youtube.com/embed/vniS5g48wHA?enablejsapi=1&wmode=opaque&autoplay=1	0	farhan	3	Satoshi Hino, Yumi Hara, Masayuki Katou, Asami Seto, Yoshino Aoyama, Saori Hayami, Haruka Tomatsu, Hitomi Nabatame
49	The SpongeBob SquarePants Movie	\N	https://xl.movieposterdb.com/15_08/2004/345950/xl_345950_4a997ac0.jpg?v=2024-08-25%2022:27:45	2004	SpongeBob takes leave from Bikini Bottom in order to track down, with Patrick, King Neptune's stolen crown.	Netflix	https://youtu.be/47ceXAEr2Oo?si=obQrt5lOPjfWtvCM	0	farhan	1	Tom Kenny, Jeffrey Tambor, Bill Fagerbakke, Clancy Brown, Rodger Bumpass, Jill Talley, Carolyn Lawrence, Mr. Lawrence, Mary Jo Catlett
50	The SpongeBob Movie: Sponge Out of Water	\N	https://xl.movieposterdb.com/14_08/2014/2279373/xl_2279373_fd7068e6.jpg?v=2023-08-25%2020:53:52	2015	When a diabolical pirate above the sea steals the secret Krabby Patty formula, SpongeBob and his friends team up in order to get it back.	Netflix	https://youtu.be/4zoI4L4x1i0?si=yeutQVxsxUtJr_ua	0	farhan	1	Tom Kenny, Antonio Banderas, Bill Fagerbakke, Clancy Brown, Eric Bauza, Tim Conway, Eddie Deezen, Rob Paulsen, Kevin Michael Richardson
51	The SpongeBob Movie: Sponge on the Run	\N	https://xl.movieposterdb.com/21_05/2020/4823776/xl_4823776_ee929659.jpg?v=2024-07-22%2015:50:22	2021	After SpongeBob's beloved pet snail Gary is snail-napped, he and Patrick embark on an epic adventure to the Lost City of Atlantic City to bring Gary home.	Netflix	https://youtu.be/a2cowVH03Xo?si=SqYPcZQc8Tp9DSQO	0	farhan	1	Tim Hill, Clancy Brown, Bill Fagerbakke, Rodger Bumpass, Mr. Lawrence, Carolyn Lawrence, Awkwafina, Tom Kenny, Jill Talley
52	Saving Bikini Bottom: The Sandy Cheeks Movie	\N	https://xl.movieposterdb.com/23_03/0/23063732/xl_saving-bikini-bottom-the-sandy-cheeks-movie-movie-poster_da43a426.jpg	2024	When Bikini Bottom is suddenly scooped out of the ocean, Sandy Cheeks and SpongeBob journey to Sandy's home state of Texas, where they meet Sandy's family and must save Bikini Bottom from the hands of an evil CEO.	Netflix	https://youtu.be/Ud6-SGnzH3k?si=c9j26OgFgRx0W_kA	0	farhan	1	Carolyn Lawrence, Tom Kenny, Clancy Brown, Bill Fagerbakke, Mr. Lawrence, Mary Jo Catlett, Rodger Bumpass, Dee Bradley Baker, Christopher Hagen
53	Mr. Bean's Holiday	\N	https://xl.movieposterdb.com/07_08/2007/453451/xl_453451_781d47f2.jpg?v=2024-07-23%2015:02:08	2007	Mr. Bean wins a trip to Cannes where he unwittingly separates a young boy from his father and must help the two reunite. On the way he discovers France, bicycling, and true love.	Netflix	https://youtu.be/LZfIzJ6XwPQ?si=EKjeOXWGZpuPc54G	0	farhan	1	Rowan Atkinson, Willem Dafoe, Steve Pemberton, Lily Atkinson, Preston Nyman, Sharlit Deyzac, Francois Touch, Emma de Caunes, Arsene Mosca
54	You're the Apple of My Eye	\N	https://upload.wikimedia.org/wikipedia/id/a/aa/You_Are_the_Apple_of_My_Eye_film_poster.jpg	2011	A group of close friends who attend a private school all have a debilitating crush on the sunny star pupil, Shen Jiayi. The only member of the group who claims not to is Ke Jingteng, but he ends up loving her as well.	Netflix	https://youtu.be/v5H6wE47FrI?si=9RdYiil_FUnL09rj	0	farhan	5	Ko Chen-tung, Michelle Chen, Owodog,Tsai Chang-hsien, Yen Sheng-yu, Wan Wan
55	Modern Family	\N	https://i.ebayimg.com/images/g/QLgAAOSwvLJfPEnL/s-l1600.webp	2009	Three different, but related, families face trials and tribulations in their own uniquely comedic ways.	Netflix	https://youtu.be/Ub_lfN2VMIo?si=MrRO8uzMkUP7R1sM	0	farhan	1	\t\nEd O'Neill, Sofia Vergara, Julie Bowen, Ty Burrell, Jesse Tyler Ferguson, Eric Stone, Sarah Hyland, Ariel, Nolan Gould\n
56	Succession	\N	https://alternativemovieposters.com/wp-content/uploads/2023/05/Colton-Tisdall_Succession.jpg	2018	The series centers on the Roy family, the owners of global media and entertainment conglomerate Waystar RoyCo, and their fight for control of the company amidst uncertainty about the health of the family's patriarch. Brian Cox portrays the family patriarch Logan Roy.	Max, Prime Video, Hulu, Apple TV, Amazon Prime Video	https://youtu.be/OzYxJV_rmE8?si=7HDytmEz7rZpLteT	0	farhan	1	\t\nHiam Abbass, Nicholas Braun, Brian Cox, Kieran Culkin, Peter Friedman, Natalie Gold, Matthew Macfadyen, Alan Ruck, Sarah Snook
57	Schindler's List	\N	https://i.pinimg.com/564x/e1/42/a5/e142a53687a5d1fcd838f2127d267999.jpg	1993	In Kraków during World War II, the Nazis force local Polish Jews into the overcrowded Kraków Ghetto. Oskar Schindler, a German Nazi Party member from Czechoslovakia, arrives in the city, hoping to make his fortune. He bribes Wehrmacht (German armed forces) and SS officials, acquiring a factory to produce enamelware. Schindler hires Itzhak Stern, a Jewish official with contacts among black marketeers and the Jewish business community; he handles administration and helps Schindler arrange financing. Stern ensures that as many Jewish workers as possible were deemed essential to the German war effort to prevent them from being taken by the SS to concentration camps or killed. Meanwhile, Schindler maintains friendly relations with the Nazis and enjoys his new wealth and status as an industrialist.	Apple TV, Amazon Prime Video, Google Play Movies, Fandango at Home	https://youtu.be/gG22XNhtnoY?si=C16w6rNkL9UXLl9P	0	farhan	1	        \nLiam Neeson, Ben Kingsley, Ralph Fiennes, Caroline Goodall, Jonathan Sagall, Embeth Davidtz
59	Fate/stay night [Heaven's Feel] I. presage flower	Gekijouban Fate/stay night [Heaven's Feel] I. presage flower	Fate/stay night [Heaven's Feel] I. presage flower (2017) (imdb.com)	2017	Shirou Emiya is a young mage who attends Homurahara Academy in Fuyuki City. One day after cleaning the Archery Dojo in his school, he catches a glimpse of a fight between superhuman beings, and he gets involved in the Holy Grail War, a ritual where mages called Masters fight each other with their Servants in order to win the Holy Grail. Shirou joins the battle to stop an evildoer from winning the Grail and to save innocent people, but everything goes wrong when a mysterious Shadow begins to indiscriminately kill people in Fuyuki.	Crunchyroll, Apple TV, Microsoft Store	https://youtu.be/AMr5pXzpvP0?si=Wrqrp_iXyxIG4dw5	0	farhan	3	Noriaki Sugiyama, Noriko Shitaya, Ayako Kawasumi, Kana Ueda, Jôji Nakata
60	Fate/stay night [Heaven's Feel] II. lost butterfly	Gekijouban Fate/stay night [Heaven's Feel] II. lost butterfly	Fate/stay night [Heaven's Feel] II. lost butterfly (2019) (imdb.com)	2019	The story focuses on the Holy Grail War and explores the relationship between Shirou Emiya and Sakura Matou, two teenagers participating in this conflict. The story continues immediately from Fate/stay night: Heaven's Feel I. presage flower, following Shirou as he continues to participate in the Holy Grail War even after being eliminated as a master.	Apple TV, Microsoft Store	https://youtu.be/nfzKXkL_i54?si=zm6E1OQ54bidiUnf	0	farhan	3	Noriaki Sugiyama, Noriko Shitaya, Ayako Kawasumi, Kana Ueda, Jôji Nakata
61	Fate/stay night [Heaven's Feel] III. spring song	Gekijouban Fate/stay night [Heaven's Feel] III. spring song	Fate/stay night [Heaven's Feel] III. spring song (2020) (imdb.com)	2020	The final chapter in the Heaven's Feel trilogy. Angra Mainyu has successfully possessed his vessel Sakura Matou. It's up to Rin, Shirou, and Rider to cleanse the grail or it will be the end of the world and magecraft as we all know it.	Apple TV, Microsoft Store Google Play Movies	https://youtu.be/KlJIMiZfxCY?si=0Lxh1O7xkwxIXi5d	0	farhan	3	Noriaki Sugiyama, Noriko Shitaya, Ayako Kawasumi, Kana Ueda, Jôji Nakata
62	Real Steel	\N	Real Steel (2011) (imdb.com)	2011	In a near future where robot boxing is a top sport, a struggling ex-boxer feels he's found a champion in a discarded robot.	Netflix, Hotstar, Hulu	https://youtu.be/1VFd5FMbZ64?si=ItKqmKxKBM6r4Whv	0	farhan	1	Hugh Jackman, Dakota Goyo, Evangeline Lilly, Anthony Mackie. Kevin Durand, Hope Davis, James Rebhorn, Karl Yune, Olga Fonda
63	knives out	\N	https://cdn.shopify.com/s/files/1/0057/3728/3618/products/726b1b0e4005ab2219e31b5582e0602a_500x749.jpg?v=1573572660	2019	A detective investigates the death of the patriarch of an eccentric, combative family.	Netflix	Knives Out (2019 Movie) Official Trailer — Daniel Craig, Chris Evans, Jamie Lee Curtis - YouTube	0	farhan	1	Ana de Armas, Chris Evans, Daniel Craig, Jamie Lee Curtis
64	memento	\N	https://cdn.shopify.com/s/files/1/0057/3728/3618/products/c15059527ae4d9c832dbb365b418369e_7c2bb4af-8bcd-428c-8904-27ddc512a45c_500x749.jpg?v=1573594896	2000	Leonard Shelby, an insurance investigator, suffers from anterograde amnesia and uses notes and tattoos to hunt for the man he thinks killed his wife, which is the last thing he remembers.	Peacock Premium Plus	Memento Original 35 mm Anamorphic Trailer (HD) (CC) - YouTube	0	farhan	1	\nGuy PearceCarrie-Anne MossJoe Pantoliano
65	the forest gump	\N	https://cdn.shopify.com/s/files/1/0057/3728/3618/products/forrest-gump---24x36_500x749.jpg?v=1645558337	1994	The history of the United States from the 1950s to the '70s unfolds from the perspective of an Alabama man with an IQ of 75, who yearns to be reunited with his childhood sweetheart.	Netflix	Forrest Gump - Trailer - YouTube	0	farhan	1	Tom HanksRobin WrightGary Sinise
66	pulp fiction	\N	https://cdn.shopify.com/s/files/1/0057/3728/3618/products/ab401c136cca10812cda5ac64c3f7c2e_bb5e62f7-b34f-4547-b5c7-495cc2dd1bd9_500x749.jpg?v=1573591339	1994	Jules Winnfield (Samuel L. Jackson) and Vincent Vega (John Travolta) are two hit men who are out to retrieve a suitcase stolen from their employer, mob boss Marsellus Wallace (Ving Rhames). Wallace has also asked Vincent to take his wife Mia (Uma Thurman) out a few days later when Wallace himself will be out of town. Butch Coolidge (Bruce Willis) is an aging boxer who is paid by Wallace to lose his fight. The lives of these seemingly unrelated people are woven together comprising of a series of funny, bizarre and uncalled-for incidents. ??Soumitra	Netflix	Pulp Fiction | Official Trailer (HD) - John Travolta, Uma Thurman, Samuel L. Jackson | MIRAMAX - YouTube	0	farhan	1	Amanda Plummer, John Travolta, Laura Lovelace, Samuel L. Jackson, Tim Roth
67	the prestige	\N	https://www.movieposters.com/cdn/shop/files/prestige.mp.140332_480x.progressive.jpg?v=1709237534	2006	The Prestige (2006) In the end of the nineteenth century, in London, Robert Angier, his beloved wife Julia McCullough, and Alfred Borden are friends and assistants of a magician. When Julia accidentally dies during a performance, Robert blames Alfred for her death, and they become enemies. Both become famous and rival magicians, sabotaging the performance of the other on the stage. When Alfred performs a successful trick, Robert becomes obsessed trying to disclose the secret of his competitor with tragic consequences. ??Claudio Carvalho, Rio de Janeiro, Brazil	Netflix	The Prestige (2006) Trailer #1 | Movieclips Classic Trailers - YouTube	0	farhan	1	Christian Bale, Hugh Jackman, Michael Caine, Piper Perabo
68	Spirited Away	Sen to Chihiro no kamikakushi	Spirited Away (2001)	2001	The fanciful adventures of a ten-year-old girl named Chihiro, who discovers a secret world when she and her family get lost and venture through a hillside tunnel. When her parents undergo a mysterious transformation, Chihiro must fend for herself as she encounters strange spirits, assorted creatures and a grumpy sorceress who seeks to prevent her from returning to the human world	Netflix	Spirited Away - Official Trailer	0	farhan	3	Miyu Irino, Rumi Hiiragi, Mari Natsuki
69	The Shining	\N	https://m.media-amazon.com/images/M/MV5BZWFlYmY2MGEtZjVkYS00YzU4LTg0YjQtYzY1ZGE3NTA5NGQxXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_FMjpg_UX1000_.jpg	1980	A family heads to an isolated hotel for the winter, where a sinister presence influences the father into violence. At the same time, his psychic son sees horrifying forebodings from both the past and the future.	Amazon Prime	https://www.youtube.com/watch?v=FZQvIJxG9Xs	0	farhan	1	Jack Nicholson, Shelley Duvall, Danny Lloyd
70	I Want to Eat Your Pancreas	Kimi no suizô o tabetai	https://m.media-amazon.com/images/M/MV5BMTQ1ODIzOGQtOGFkZC00MWViLTgyYmUtNWJkNmIxZjYxMTdmXkEyXkFqcGc@._V1_.jpg	2018	A high school student discovers one of his classmates, Sakura Yamauchi, is suffering from a terminal illness. This secret brings the two together, as she lives out her final moments.	Apple TV	https://www.youtube.com/watch?v=HuN15mDKakk	0	farhan	3	Mahiro Takasugi, Lynn, Yukiyo Fujii
71	Hereditary	\N	https://m.media-amazon.com/images/M/MV5BOTU5MDg3OGItZWQ1Ny00ZGVmLTg2YTUtMzBkYzQ1YWIwZjlhXkEyXkFqcGdeQXVyNTAzMTY4MDA@._V1_.jpg	2018	A grieving family is haunted by tragic and disturbing occurrences.	Amazon Prime, Hulu	https://www.youtube.com/watch?v=V6wWKNij_1M	0	farhan	1	Toni Collette, Milly Shapiro, Gabriel Byrne
72	Perfume: The Story of a Murderer	\N	https://m.media-amazon.com/images/M/MV5BMTg2Mzk2NjkzNl5BMl5BanBnXkFtZTYwMzIzOTc2._V1_.jpg	2006	Jean-Baptiste Grenouille, born with a superior olfactory sense, creates the world's finest perfume. His work, however, takes a dark turn as he searches for the ultimate scent.	Netflix, Amazon Prime	https://www.youtube.com/watch?v=_-qv0EnGhJU	0	farhan	6	Ben Whishaw, Dustin Hoffman, Alan Rickman
73	Kingsman: The Secret Service	\N	https://a.ltrbxd.com/resized/film-poster/1/4/8/2/0/0/148200-kingsman-the-secret-service-0-1000-0-1500-crop.jpg?v=cd49b739cf	2014	The story of a super-secret spy organization that recruits an unrefined but promising street kid into the agency’s ultra-competitive training program just as a global threat emerges from a twisted tech genius.	Netflix, Amazon US	https://www.youtube.com/watch?v=m4NCribDx4U&pp=ygUba2luZ3NtYW4gdGhlIHNlY3JldCBzZXJ2aWNl	0	farhan	4	Taron Egerton, Colin Firth, Samuel L. Jackson, Mark Strong, Sophie Cookson, Sofia Boutella, Michael Caine, Mark Hamill
74	Kingsman: The Golden Circle	\N	https://a.ltrbxd.com/resized/sm/upload/3h/o6/gc/iy/yOGf8Or1k78Y6OLdYmTTSGHW1dP-0-1000-0-1500-crop.jpg?v=9a2da8212b	2017	When an attack on the Kingsman headquarters takes place and a new villain rises, Eggsy and Merlin are forced to work together with the American agency known as the Statesman to save the world.	Netflix, Amazon US	https://www.youtube.com/watch?v=6Nxc-3WpMbg&pp=ygUaa2luZ3NtYW4gdGhlIGdvbGRlbiBjaXJjbGU%3D	0	farhan	4	Colin Firth, Julianne Moore, Taron Egerton, Mark Strong, Halle Berry, Pedro Pascal, Channing Tatum, Jeff Bridges
75	Behind Her Eyes	\N	https://posters.movieposterdb.com/22_06/2021/9698442/l_9698442_818a3641.jpg	2021	It follows Louise, a single mum with a son and a part-time job in a psychiatrist's office. She begins an affair with her boss and strikes up an unlikely friendship with his wife.	Netflix	https://www.youtube.com/watch?v=c4LtoWQaLxk&pp=ygUXYmVoaW5kIGhlciBleWVzIHRyYWlsZXI%3D	0	farhan	4	Simona Brown, Eve Hewson, Tom Bateman
76	Baby Driver	\N	https://a.ltrbxd.com/resized/film-poster/2/6/8/9/5/0/268950-baby-driver-0-1000-0-1500-crop.jpg?v=61304ddfc8	2017	After being coerced into working for a crime boss, a young getaway driver finds himself taking part in a heist doomed to fail.	Apple TV, Amazon	https://www.youtube.com/watch?v=zTvJJnoWIPk	0	farhan	4	\nAnsel Elgort, Kevin Spacey, Lily James, Jon Hamm, Jamie Foxx
77	Back to the Future	\N	https://a.ltrbxd.com/resized/film-poster/5/1/9/4/5/51945-back-to-the-future-0-1000-0-1500-crop.jpg?v=6662417358	1985	Eighties teenager Marty McFly is accidentally sent back in time to 1955, inadvertently disrupting his parents’ first meeting and attracting his mother’s romantic interest. Marty must repair the damage to history by rekindling his parents’ romance and - with the help of his eccentric inventor friend Doc Brown - return to 1985.	Amazon Prime	https://www.youtube.com/watch?v=qb7Fd0l_BRo	0	farhan	1	Michael J. Fox, Christopher Lloyd, Crispin Glover, Lea Thompson, Claudia Wells, Thomas F. Wilson
78	Ae Dil Hai Mushkil	\N	https://posters.movieposterdb.com/21_11/2016/4559006/l_4559006_2672b3c1.jpg	2016	Ayan goes on a quest for true love when Alizeh does not reciprocate his feelings. On his journey, he meets different people who make him realize the power of unrequited love.	Netflix, Amazon Prime, Apple TV	https://www.youtube.com/watch?v=Z_PODraXg4E	0	farhan	7	Ranbir Kapoor, Anushka Sharma, Aishwarya Rai Bachchan, Fawad Khan, Alia Bhatt
79	Kal Ho Naa Ho	\N	https://posters.movieposterdb.com/12_05/2003/347304/s_347304_e7f7919b.jpg	2003	Naina's neighbor, Aman, introduces her to optimism, and makes her fall in love. But tragedy stopped him from moving forward. In fact, he encouraged his friend Rohit to seduce her.	Netflix, Amazon Prime, Apple TV	https://www.youtube.com/watch?v=tVMAQAsjsOU	0	farhan	7	Jaya Bachchan, Shah Rukh Khan, Saif Ali Khan, Preity Zinta
80	Kabhi Khushi Kabhie Gham	\N	https://posters.movieposterdb.com/10_08/2001/248126/s_248126_0a404d08.jpg	2001	Rahul is sad because his father disapproves of his relationship with the poor Anjali, but still marries her and moves to London. 10 years later, Rahul's younger brother wants to reconcile his father and brother.	Netflix, Amazon Prime, Apple TV	https://www.youtube.com/watch?v=7uY1JbWZKPA	0	farhan	7	Shah Rukh Khan, Hrithik Roshan, Kareena Kapoor, Kajol, Amitabh Bachchan 
81	Jab Tak Hai Jaan	\N	https://posters.movieposterdb.com/12_09/2012/2176013/s_2176013_f513dba4.jpg	2012	Samar Anand is forced to leave his girlfriend, Khushi (Katrina Kaif). From London, he returns to Kashmir leaving his past behind, and meets Akira, a cheerful woman who works for a television program about wildlife. Will Samar still hope for Khushi or choose to start a new life with Akira?	Amazon Prime, Apple TV	https://www.youtube.com/watch?v=v0UXgoJ9Shg	0	farhan	7	Shah Rukh Khan, Katrina Kaif, Anushka Sharma
82	Bajrangi Bhaijaan	\N	https://posters.movieposterdb.com/15_09/2015/3863552/s_3863552_b160f1f4.jpg	2015	Pavan, a devotee of Hanuman, faces various challenges when he tries to reunite Munni with her family after Munni goes missing while traveling back home with her mother.	Disney +, Bstation	https://www.youtube.com/watch?v=4nwAra0mz_Q	0	farhan	7	Salman Khan, Kareena Kapoor, Harshaali Malhotra
83	Transformers: Revenge of the Fallen	\N	https://m.media-amazon.com/images/M/MV5BNjk4OTczOTk0NF5BMl5BanBnXkFtZTcwNjQ0NzMzMw@@._V1_.jpg	2009	A youth chooses manhood. The week Sam Witwicky starts college, the Decepticons make trouble in Shanghai. A presidential envoy believes it's because the Autobots are around; he wants them gone. He's wrong: the Decepticons need access to Sam's mind to see some glyphs imprinted there that will lead them to a fragile object that, when inserted in an alien machine hidden in Egypt for centuries, will give them the power to blow out the sun. Sam, his girlfriend Mikaela Banes, and Sam's parents are in danger. Optimus Prime and Bumblebee are Sam's principal protectors. If one of them goes down, what becomes of Sam?	Netflix	https://youtu.be/fnXzKwUgDhg?si=OQS8kGFiwTr7QiNx	0	farhan	1	Shia LaBeouf, Megan Fox, Tyrese Gibson, Josh Duhamel, John Turturro, Ramon Rodriguez, Kevin Dunn, Julie White
84	Transformers: Dark of the Moon	\N	https://m.media-amazon.com/images/M/MV5BMTkwOTY0MTc1NV5BMl5BanBnXkFtZTcwMDQwNjA2NQ@@._V1_FMjpg_UY478_.jpg	2011	Autobots Bumblebee, Ratchet, Ironhide, Mirage (aka Dino), Wheeljack (aka Que) and Sideswipe led by Optimus Prime, are back in action taking on the evil Decepticons, who are eager to avenge their recent defeat. The Autobots and Decepticons become involved in a perilous space race between the United States and Russia to reach a hidden Cybertronian spacecraft on the moon and learn its secrets, and once again Sam Witwicky has to go to the aid of his robot friends. The new villain Shockwave is on the scene while the Autobots and Decepticons continue to battle it out on Earth.	Netflix	https://youtu.be/97wCoDn0RrA?si=e5YzLTIFpIwrYnYe	0	farhan	1	Shia LaBeouf, Rosie Huntington-Whiteley, Tyrese Gibson, Josh Duhamel, John Turturro, Patrick Dempsey
85	Transformers: Age of Extinction	\N	https://m.media-amazon.com/images/M/MV5BMjEwNTg1MTA5Nl5BMl5BanBnXkFtZTgwOTg2OTM4MTE@._V1_FMjpg_UY749_.jpg	2014	After the battle between the Autobots and Decepticons that leveled Chicago, humanity thinks that all alien robots are a threat. So Harold Attinger, a CIA agent, establishes a unit whose sole purpose is to hunt down all of them. But it turns out that they are aided by another alien robot who is searching for Optimus Prime. Cade Yeager, a robotics expert, buys an old truck and upon examining it, he thinks it's a Transformer. When he powers it up, he discovers it's Optimus Prime. Later, men from the unit show up looking for Optimus. He helps Yeager and his daughter Tessa escape but are pursued by the hunter. They escape and Yeager learns from technology he took from the men that a technology magnate and defense contractor named Joshua Joyce is part of what's going on, so they go to find out what's going on.	Netflix	https://youtu.be/T9bQCAWahLk?si=8FrmWIM7-aw4mbPX	0	farhan	1	Mark Wahlberg, Nicola Peltz Beckham, Jack Reynor, Stanley Tucci, Kelsey Grammer, Titus Wellver
86	Transformers: The Last Knight	\N	https://m.media-amazon.com/images/M/MV5BYWNlNjU3ZTItYTY3Mi00YTU1LTk4NjQtYjQ3MjFiNjcyODliXkEyXkFqcGc@._V1_.jpg	2017	Having left Earth, Optimus Prime finds his dead home planet, Cybertron, and discovers that he was in fact responsible for its destruction. Optimus learns that he can bring Cybertron back to life, but in order to do so, he will need an artifact that is hidden on Earth.	Netflix	https://youtu.be/6Vtf0MszgP8?si=jChC9qfWPfCUXZIv	0	farhan	1	Mark Wahlberg, Anthony Hopkins, Josh Duhamel, Laura Haddock, Santiago Cabrera, Isabela Merced
87	Transformers: Rise of the Beasts	\N	https://m.media-amazon.com/images/M/MV5BZTVkZWY5MmItYjY3OS00OWY3LTg2NWEtOWE1NmQ4NGMwZGNlXkEyXkFqcGc@._V1_FMjpg_UY711_.jpg	2023	Returning to the action and spectacle that has captivated moviegoers around the world, Transformers: Rise of the Beasts will take audiences on a global '90s adventure with the Autobots and introduce a new faction of Transformers - the Maximals - to join them as allies in the war. the ongoing battle on earth. Directed by Steven Caple Jr. and starring Anthony Ramos and Dominique Fishback	Netflix	https://youtu.be/itnqEauWQZM?si=7JF9i9hFZ3PDlpPw	0	farhan	1	Anthony Ramos, Dominique Fishback, Luna Lauren Velez, Dean Scott Vazquez, Tobe Nwigwe, Sarah Stiles
88	Detective Conan Movie: The Sniper from Another Dimension\n\n	Meitantei Conan: Ijigen no Sniper	https://xl.movieposterdb.com/14_04/2014/3455204/xl_3455204_18202e5c.jpg	2014	After participating in the opening ceremony, Conan, Professor Agasa, Ran, Haibara, and the Detective Boys are enjoying the view from the observation deck of the 635-metre tall Bell Tree Tower. Suddenly, a bullet breaks through a window, strikes a man's chest and breaks a TV screen, causing everyone to panic. Conan stays calm and, using the zoom function on his tracking glasses to follow the path of the bullet to its source, spots the sniper. He and Masumi Sera, who had been present at the Tower as part of an assignment to shadow the victim, pursue the fleeing culprit on Masumi's motorcycle, but the chase takes a violent turn when the suspect uses a handgun and even hand grenades to take out his pursuers. Even the FBI get involved in the chase, but the culprit and the mysteries of the sniping end up vanishing into the ocean.	Netflix, Bstation	Detective Conan movie 18 sniper from another dimension full trailer HD - YouTube	0	farhan	3	Minami Takayama, Kappei Yamaguchi,Wakana Yamazaki,Rikiya Koyama,Megumi Hayashibara,Ken'ichi Ogata,Chafûrin,Wataru Takagi
89	Detective Conan: The Darkest Nightmare	Meitantei Conan: Junkoku no Nightmare\n	https://xl.movieposterdb.com/19_12/2016/4954660/xl_4954660_625971f4.jpg?v=2020-01-02%2013:32:54	2016	A spy infiltrated the Japanese National Police Agency, retrieving secret files of Britain's MI6, Germany's BND and America's CIA and FBI. Rei Furuya and a group of Tokyo Police PSB intercepted the spy during the getaway, and just before the major car accident, FBI Agent Shuichi Akai sniped and crashed the spy's vehicle. The next day, at the aquarium in Tokyo with the Ferris wheel, Conan and the Detective Boys found a woman with heterochromia iris who suffered memory loss and had a broken cell phone. Having decided to stay and help the woman regain her memory, Conan and the Detective Boys are under the watchful eye of Vermouth.\n	Netflix, Bstation	DETECTIVE CONAN: THE DARKEST NIGHTMARE - Official Trailer (In cinemas 7 July) - YouTube	0	farhan	3	Minami Takayama, Kappei Yamaguchi,Wakana Yamazaki,Rikiya Koyama,Megumi Hayashibara,Ken'ichi Ogata,Chafûrin,Wataru Takagi,\n\n,
90	Detective Conan: Zero The Enforcer	Meitantei Conan: Zero no Shikkounin	https://xl.movieposterdb.com/20_01/2018/7880466/xl_7880466_fb8b1bfb.jpg?v=2020-01-02%2015:53:38	2018	Detective Conan investigates an explosion that occurs on the opening day of a large Tokyo resort and convention center.\n\n	Netflix, Bstation	DETECTIVE CONAN: ZERO THE ENFORCER Official Indonesia Trailer - YouTube	0	farhan	3	Minami Takayama, Kappei Yamaguchi,Wakana Yamazaki,Rikiya Koyama,Megumi Hayashibara,Ken'ichi Ogata,Chafûrin,Wataru Takagi,\n\n,
91	Detective Conan :The Lost Ship in the Sky\n\n	Meitantei Conan: Tenkuu no rosuto shippu	https://xl.movieposterdb.com/10_08/2010/1636815/xl_1636815_c926bd5b.jpg 	2010	Kid has his eyes set on the Lady of the Sky jewel aboard Bell 3, the largest airship in the world. However, a mysterious terrorist group called Red Shamu-neko has hijacked the airship, along with Conan and his allies Kogoro and Ran.\n	Netflix, Bstation	Detective Conan Movie 14 _ Lost Ship In The Sky OFFICIAL TRAILER - YouTube	0	farhan	3	Minami Takayama, Kappei Yamaguchi,Wakana Yamazaki,Rikiya Koyama,Megumi Hayashibara,Ken'ichi Ogata,Chafûrin,Wataru Takagi,\n\n,
92	Detective Conan: The Sunflower Of Inferno	Meitantei Conan: Gouka no Himawari\n	https://xl.movieposterdb.com/15_08/2015/3737650/xl_3737650_927f2a54.jpg	2015	Conan and his friends must prevent Kid from stealing a famous painting.\n\n	Netflix, Bstation	Detective Conan: Sunflowers of Inferno Official Trailer - YouTube	0	farhan	3	Minami Takayama, Kappei Yamaguchi,Wakana Yamazaki,Rikiya Koyama,Megumi Hayashibara,Ken'ichi Ogata,Chafûrin,Wataru Takagi,\n\n,
93	Locke and Key	\N	https://m.media-amazon.com/images/M/MV5BOTdkMDY3NDctZTgyZi00Yzc3LTk1ZWEtNWUxNTVlN2YzNDU3XkEyXkFqcGdeQXVyNDk3ODk4OQ@@._V1_.jpg	2020	After their father is murdered under mysterious circumstances, the three Locke siblings and their mother move into their ancestral home, Keyhouse, which they discover is full of magical keys that may be connected to their father's death.	Netflix	https://youtu.be/_EonRi0yQOE?si=IIhKwJs7h3N2AyrM	0	farhan	1	Darby Stanchfield, Connor Jessup, Emilia Jones, Jackson Robert Scott, Petrice Jones, Hallea Jones, Aaron Ashmore, Griffin Gluck, Sherri Saum
94	Gadis Kretek	Cigarette Girl	https://m.media-amazon.com/images/M/MV5BYzcxYzIzODItMTljNy00OGYwLWJmMWUtNzIyZDdiOTI1MWNlXkEyXkFqcGdeQXVyMTEzMTI1Mjk3._V1_.jpg	2023	Amid the evocative blend of flavorful spices to create the perfect kretek cigarette, two souls embark on an epic romance set in 1960s Indonesia.	Netflix	https://youtu.be/PJybk11EIm8?si=-5o7RqiijqWx9kiS	0	farhan	2	Dian Sastrowardoyo, Ario Bayu, Arya Saloka, Putri Marino, Ibnu Jamil, Sheila Dara Aisha, Tissa Biani Azzahra
95	Nightmares and Daydreams	\N	https://m.media-amazon.com/images/M/MV5BMTc4N2M4OTEtMGExMS00MDJkLWJkYjUtOTI5MmQ4NjhjYjJiXkEyXkFqcGdeQXVyMTEzMTI1Mjk3._V1_.jpg	2024	Ordinary people encountering strange phenomenons that may be keys to the answer about the origin of our world and the imminent threat we will soon face.	Netflix	https://youtu.be/YF6s3lIc17Q?si=vOut8-buvxyfIW0m	0	farhan	2	Sita Nursanti, Haydar Salishz, Lukman Sardi, Ario Bayu, Marissa Anita
96	Bohemian Rhapsody	\N	https://m.media-amazon.com/images/M/MV5BMTA2NDc3Njg5NDVeQTJeQWpwZ15BbWU4MDc1NDcxNTUz._V1_FMjpg_UX1000_.jpg	2018	The story of the legendary British rock band Queen and lead singer Freddie Mercury, leading up to their famous performance at Live Aid (1985)	Netflix	https://youtu.be/mP0VHJYFOAU?si=tEUYVdP5TE_NHU7a	0	farhan	1	Rami Malek, Lucy Boynton, Gwilym Lee, Ben Hardy, Joseph Mazzello, Aidan Gillen
97	Young Sheldon	\N	https://m.media-amazon.com/images/M/MV5BZTlmYjk0ZTItODNhMC00YmIyLWExZWEtYjk0YWQzMGNhOTZmXkEyXkFqcGdeQXVyMTY0Njc2MTUx._V1_FMjpg_UX1000_.jpg	2017	Meet a child genius named Sheldon Cooper (already seen as an adult in The Big Bang Theory (2007)) and his family. Some unique challenges face Sheldon, who is socially impaired.	Netflix, Prime Video	https://youtu.be/FStMMcj-RiA?si=gJ_zZkkNb1jB-4uJ	0	farhan	1	Iain Armitage, Zoe Perry, Lance Barber, Montana Jordan, Raegan Revord, Annie Potts
98	Spy Kids	\N	https://m.media-amazon.com/images/M/MV5BY2JhODU1NmQtNjllYS00ZmQwLWEwZjYtMTE5NjA1M2YyMzdjXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_QL75_UX190_CR0,0,190,281_.jpg	2001	The film opens with Carmen and Juni Cortez (Alexa Vega and Daryl Sabara) being tucked into bed by their mother, Ingrid (Carla Gugino). While Juni applies wart killer to his fingers, Carmen requests to hear the bedtime story, The Two Spies Who Fell in Love.	Netflix	https://youtu.be/GE5aHKJp6HI?si=rwvzLkvs829Sn2qE	0	farhan	1	Antonio Banderas, Carla Gugino, Alexa PenaVega, Daryl Sabara, Alan Cumming, Tony Shalhoub, Teri Hatcher, Cheech Marin, Robert Patrick, Danny Trejo, Mike Judge, Richard Linklater 
99	Spy Kids 2: The Island of Lost Dreams	\N	https://m.media-amazon.com/images/I/51UtV22RQPL._AC_UF1000,1000_QL80_.jpg	2002	The Cortez siblings set out for a mysterious island, where they encounter a genetic scientist and a set of rival spy kids.	Vidio	https://youtu.be/8tTJ7kMgANg?si=w5iOj2O2Y07Jm0LG	0	farhan	1	Antonio Banderas, Carla Gugino, Alexa PenaVega, Daryl Sabara, Steve Buscemi, Mike Judge, Danny Trejo, Cheech Marin, Matt O'Leary
100	Spy Kids 3-D: Game Over	\N	https://m.media-amazon.com/images/I/51J30GKHNGL._AC_UF894,1000_QL80_.jpg	2003	Carmen's caught in a virtual reality game designed by the Kids' new nemesis, the Toymaker. It's up to Juni to save his sister, and ultimately the world.	Vidio	https://youtu.be/GeFgj3CsfpI?si=8qIqAfIdRUVQ4yoR	0	farhan	1	Antonio Banderas, Carla Gugino, Alexa PenaVega, Daryl Sabara, Ricardo Montalban, Holland Taylor, Sylvester Stallone, Mike Judge, Salma Hayek
101	Spy Kids: All the Time in the World	\N	https://m.media-amazon.com/images/I/810QZaXJdML._AC_UF894,1000_QL80_.jpg	2011	A retired spy is called back into action, and to bond with her new step-children, she invites them along for the adventure to stop the evil Timekeeper from taking over the world.	Prime Video	https://youtu.be/yUdkW8Nvpx8?si=-ong0RPOvUgjAAC7	0	farhan	1	Jessica Alba, Joel McHale, Rowan Blanchard, Mason Cook, Jeremy Piven, Alexa PenaVega, Daryl Sabara, Danny Trejo, Belle Solorzano
102	Spy Kids: Armageddon	\N	https://m.media-amazon.com/images/M/MV5BYzRkYjRmNDYtOGYyYS00ZWJjLWIzMTYtYmIyYTYwN2M1NTM4XkEyXkFqcGdeQXVyNDc5NDc2Nw@@._V1_.jpg	2023	Tony (Connor Esterson) and Patty (Everly Carganilla) were quite good at playing online games, and they spend most of their time doing that, which is why their parents, Terrence Tango (Zachary Levi) and Nora Torrez (Gina Rodriguez), had some strict rules in place. Terrence has these rules as Terence and Nora are spies and their computers host the top-secret Armageddon code, and they are afraid that someone might use their kids' computers to hack into their network and steal the Armageddon code. Both spies are told by their boss Devlin that unknown assailants are trying to break into OSS servers to get to the Armageddon code.	Netflix	https://youtu.be/TuiRw0v3bAw?si=cbsMjAM9vs090sIv	0	farhan	1	Connor Esterson, Everly Carganilla, Zachary Levi, Gina Rodriguez, Billy Magnussen, D.J. Cotrona, Joe Schilling, Solar Dena, Nicholas James Otriz
103	Oh My Ghost	오 나의 귀신님 (Oh Naui Gwisinnim)	https://thumbor.prod.vidiocdn.com/AcDmZjSup_7kgrDdRlExK4r-Jrw=/filters:quality(70)/vidio-media-production/uploads/image/source/4683/384411.jpg	2015	The story follows a shy assistant chef who gets possessed by a lustful virgin ghost. With her newfound confidence, she tries to seduce her boss, but things get complicated as they all get entangled in the ghost's unfinished business.	Viu	https://youtu.be/dgVZdt1j8-M?si=BPMBlS3tf7U5C8Fi 	0	farhan	0	Park Bo-young, Jo Jung-suk, Kim Seul-gi, Kwak Si-yang, Lim Ju-hwan, Shin Hye-sun, Seo In-guk, Kang Ki-young
104	Reply1988	응답하라 1988 (Eungdabhara 1988)	https://upload.wikimedia.org/wikipedia/id/d/d8/TVN%27s_Reply_1988_%28%EC%9D%91%EB%8B%B5%ED%95%98%EB%9D%BC_1988%29_poster.jpg	2015	Set in the late 1980s, this drama follows five childhood friends who live in the same neighborhood. It captures the warmth and hardships of their families, the joys of friendship, and the sweet moments of first love.	Netflix	https://youtu.be/hDI4IpZoaG4?si=KgGRZyiRAZLM5J4y	0	farhan	0	Hyeri, Ryu Jun-yeol, Park Bo-gum, Go Kyung-pyo, Lee Dong-hwi, Sung Dong-il, Lee Il-hwa, Ra Mi-ran, Kim Sung-kyun
105	My Liberation Notes	나의 해방일지 (Naui Haebangilji)	https://asianwiki.com/images/1/14/My_Liberation_Notes-p1.jpg	2022	This series portrays the lives of three siblings who long to escape their mundane lives and find true liberation. They meet a mysterious stranger who changes their perspectives on life.	Netflix	https://youtu.be/EwqFfHRPp8Q?si=gNlXZWBcVj-rF2hd	0	farhan	0	Kim Ji-won, Lee Min-ki, Son Seok-koo, Lee El
106	Mouse	마우스 (Mauseu)	https://assets-a1.kompasiana.com/items/album/2021/06/29/mouse-03-60dae4471525104a40180012.jpg	2021	A suspenseful thriller that explores the question of whether psychopaths are born or made. The story follows a rookie police officer who encounters a psychopathic killer that leads to a chase filled with mind games.	Netflix	https://youtu.be/Q6Nki1_8RBU?si=Grd1A0ii_PNgJtjS	0	farhan	0	Lee Seung-gi, Lee Hee-joon, Park Ju-hyun, Kyung Soo-jin, Ahn Jae-wook
107	Moving	무빙 (Mubing)	https://asianwiki.com/images/e/ec/Moving-MP1.jpeg	2023	A supernatural drama about a group of teenagers who inherit superpowers from their parents. They struggle to protect their secrets while trying to understand the origins of their abilities.	Disney+	https://www.youtube.com/watch?v=UVYw3biOgyE	0	farhan	0	Ryu Seung-ryong, Han Hyo-joo, Jo In-sung, Kim Sung-kyun, Lee Jung-ha, Go Youn-jung, Kim Do-hoon
146	Ong-Bak 1	 Muay Thai Warrior	https://image.tmdb.org/t/p/original/5iG1Ql7pQJd5gnG77BruaVYjLUq.jpg	2003	Ong Bak follows a Muay Thai fighter named Ting who embarks on a quest to retrieve a stolen Buddha statue’s head from his village. Ting faces numerous obstacles and dangerous enemies in Bangkok.	Amazon Prime Video, Netflix, \nyoutube	https://youtu.be/GQ5qcPsCP9A?feature=shared	0	farhan	8	Tony Jaa, Petchtai Wongkamlao, Vorasit Issara
108	Pacific Rim	\N	https://m.media-amazon.com/images/M/MV5BMTY3MTI5NjQ4Nl5BMl5BanBnXkFtZTcwOTU1OTU0OQ@@._V1_.jpg	2013	Long ago, legions of monstrous creatures called Kaiju arose from the sea, bringing with them all-consuming war. To fight the Kaiju, mankind developed giant robots called Jaegers, designed to be piloted by two humans locked together in a neural bridge. However, even the Jaegers are not enough to defeat the Kaiju, and humanity is on the verge of defeat. Mankind's last hope now lies with a washed-up ex-pilot, an untested trainee and an old, obsolete Jaeger.	Netflix	https://youtu.be/5guMumPFBag?si=5lGCXjccMSJB37yy	0	farhan	1	Idris Elba, Charlie Hunnam, Rinko Kikuchi, Charlie Day, Diego Klattenhof, Burn Gorman, Max Martini
109	Pacific Rim: Uprising	\N	https://m.media-amazon.com/images/M/MV5BMjI3Nzg0MTM5NF5BMl5BanBnXkFtZTgwOTE2MTgwNTM@._V1_.jpg	2018	Jake Pentecost is a once-promising Jaeger pilot whose legendary father gave his life to secure humanity's victory against the monstrous Kaiju. Jake has since abandoned his training only to become caught up in a criminal underworld. But when an even more unstoppable threat is unleashed to tear through cities and bring the world to its knees, Jake is given one last chance by his estranged sister, Mako Mori, to live up to his father's legacy.	Netflix	https://youtu.be/8BAhwgjMvnM?si=9OdTE_h4sGgCLVce	0	farhan	1	John Boyega, Scott eastwood, Cailee Spaeny, Burn Gorman, Charlie Day, Tian Jing, Jin Zhang, Adria Arjona 
110	The Da Vinci Code	\N	https://upload.wikimedia.org/wikipedia/id/9/9b/The_da_vinci_code.jpg	2006	A murder in Paris' Louvre Museum and cryptic clues in some of Leonardo da Vinci's most famous paintings lead to the discovery of a religious mystery. For 2,000 years a secret society closely guards information that -- should it come to light -- could rock the very foundations of Christianity.	Netflix	https://youtu.be/5sU9MT8829k?si=hlYLoPjj0NzxCTS3	0	farhan	1	Tom Hanks, Audrey Tautou, Jean Reno, Ian McKellen, Paul Bettany, Alfred Molina
111	Inferno	\N	https://m.media-amazon.com/images/M/MV5BMTUzNTE2NTkzMV5BMl5BanBnXkFtZTgwMDAzOTUyMDI@._V1_.jpg	2016	Famous symbologist Robert Langdon (Tom Hanks) follows a trail of clues tied to Dante, the great medieval poet. When Langdon wakes up in an Italian hospital with amnesia, he teams up with Sienna Brooks (Felicity Jones), a doctor he hopes will help him recover his memories. Together, they race across Europe and against the clock to stop a madman (Ben Foster) from unleashing a virus that could wipe out half of the world's population.	Netflix	https://youtu.be/RH2BD49sEZI?si=M0D6nbooVBubx2qI	0	farhan	1	Tom Hanks, Felicity Jones, Irrfan Khan, Ben Foster, Omar Sy, Ana Ularu, Ida Darvish
112	6 Underground	\N	https://m.media-amazon.com/images/M/MV5BNzE2ZjQxNjEtNmI2ZS00ZmU0LTg4M2YtYzVhYmRiYWU0YzI1XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg	2019	Six individuals from all around the globe, each the very best at what they do, have been chosen not only for their skill, but for a unique desire to delete their pasts to change the future.	Netflix	https://youtu.be/YLE85olJjp8?si=RhBp3nlYhwKVT7p5	0	farhan	1	Ryan Reynolds, Melanie Laurent, Manuel Garcia Rulfo, Ben Hardy, Adria Arjona
113	You're Beautiful 	\N	https://s-media-cache-ak0.pinimg.com/564x/7a/87/30/7a873069c66b38b6cb6f35e60eb04074.jpg	2009	Go Mi-Nyu, a girl about to become a nun, is asked to cover for her indisposed twin brother, Mi-Nam, who's on the verge of becoming a k-idol. To do so, she disguises herself as a boy and joins A.N.Jell, a really popular boy band.	Viki, Rakuten	https://www.youtube.com/watch?v=Va3jnNTzmZY&pp=ygUgeW91cmUgYmVhdXRpZnVsIG9mZmljaWFsIHRyYWlsZXI%3D	0	farhan	0	Jang Keun-Suk, Park Shin-Hye, Lee Hong-gi, Jung Yong-hwa
114	Castle	\N	https://static.cinemagia.ro/img/db/movie/03/49/80/castle-160337l.jpg	2009	When a psychopath commits murders based on novelist Castle's books, Detective Beckett seeks his help to solve the case. He decides to work with her and uses his experiences as research for his novels.	Hulu, Amazon Prime Video	https://www.youtube.com/watch?v=aaorTM2wB9o&pp=ygUXY2FzdGxlIG9mZmljaWFsIHRyYWlsZXI%3D	0	farhan	1	Nathan Fillion, Stana Katic, Susan Sullivan, Jon Huertas, Molly Quinn
115	Molly's Game	\N	https://4.bp.blogspot.com/-jbVXtigI4no/WkCLBVdBCXI/AAAAAAAAfvA/4orTYwz3gAwy1jastsvDestxZIyuOGiNwCLcBGAs/s1600/mollys-game-341902ID1b_MollysGame_OneSheet_RGB_ComingSoon_Trim_email%255B2%255D_rgb.jpg	2017	The true story of Molly Bloom, an Olympic-class skier who ran the world's most exclusive high-stakes poker game and became an FBI target.	Netflix, Amazon Prime Video	https://www.youtube.com/watch?v=Vu4UPet8Nyc&pp=ygUcbW9sbHlzIGdhbWUgb2ZmaWNpYWwgdHJhaWxlcg%3D%3D	0	farhan	1	Jessica Chastain, Idris Elba, Kevin Costner, Michael Cera, Chris O'Dowd
116	Kiki's Delivery Service	\N	https://m.media-amazon.com/images/M/MV5BYTQ1ZTM1ZTgtN2Q2Ny00YjFkLTliNjEtN2I1ZmY5ZTY1OTEzXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_FMjpg_UX1000_.jpg	1889	Along with her black cat Jiji, Kiki settles in a seaside town and starts a high-flying delivery service. Here begins her magical encounter with independence and responsibility, making lifelong friends and finding her place in the world.	HBO Max, Amazon Prime Video, Netflix 	https://www.youtube.com/watch?v=4bG17OYs-GA&pp=ygUoa2lraSdzIGRlbGl2ZXJ5IHNlcnZpY2Ugb2ZmaWNpYWwgdHJhaWxlcg%3D%3D	0	farhan	3	Minami Takayama, Rei Sakuma, Kappei Yamaguchi
117	Criminal Mind	\N	https://picfiles.alphacoders.com/125/thumb-1920-125663.jpg	2005	A group of criminal profilers who work for the FBI as members of its Behavioral Analysis Unit (BAU) using behavioral analysis and profiling to help investigate crimes and find the suspect known as the unsub.	Hulu, Paramount+, Amazon Prime Video	https://www.youtube.com/watch?v=d73rBmyRNH4&pp=ygUeY3JpbWluYWwgbWluZCBvZmZpY2lhbCB0cmFpbGVy	0	farhan	1	Matthew Gray Gubler, Kirsten Vangsness, A.J. Cook, Thomas Gibson, Shemar Moore
118	Detective Conan: The Last Wizard of the Century	Meitantei Konan: Seikimatsu no Majutsushi	https://www.detectiveconanworld.com/wiki/images/thumb/6/6f/Movie3poster.jpg/275px-Movie3poster.jpg	1999	Conan takes on the notorious thief Kaitou Kid in a battle of wits involving a precious Russian Easter egg.	Amazon Prime Video, Crunchyroll	https://youtu.be/YW_t7Y93Rnc?si=o0cLyqfNEmw20s9w	0	farhan	3	Minami Takayama, Wakana Yamazaki, Akira Kamiya, Kappei Yamaguchi, Chafurin, Wataru Takagi, Yukiko Iwai, Ikue Otani, Naoko Matsui
119	Detective Conan: Captured in Her Eyes	Meitantei Konan: Hitomi no Naka no Ansatsusha	https://www.detectiveconanworld.com/wiki/images/thumb/5/59/Movie4poster.jpg/275px-Movie4poster.jpg	2000	After witnessing a murder, Ran loses her memory and Conan must protect her from being targeted by the killer.	\N	https://youtu.be/kZGz0zrzlQw?si=HzeIPA9FWfM5TN0M	0	farhan	3	Minami Takayama, Wakana Yamazaki, Akira Kamiya, Kappei Yamaguchi, Chafurin, Wataru Takagi, Yukiko Iwai, Ikue Otani, Naoko Matsui
120	Home Alone	\N	https://upload.wikimedia.org/wikipedia/en/7/76/Home_alone_poster.jpg	1990	An 8-year-old boy is accidentally left home alone by his family during Christmas vacation and must defend his home against two inept burglars.	Disney+, Amazon Prime Video	https://youtu.be/NOIgZYlYvyk?si=WRFYgNPzHPNAeNy0	0	farhan	1	Macaulay Culkin, Joe Pesci, Daniel Stern, Catherine O'Hara, John Heard, Roberts Blossom, Devin Ratray, Angela Goethals, Gerry Bamman
121	Home Alone 2: Lost in New York	\N	https://upload.wikimedia.org/wikipedia/en/thumb/5/50/Home_Alone_2.jpg/220px-Home_Alone_2.jpg	1992	Kevin accidentally boards a flight to New York City and gets separated from his family who are on their way to Miami. He then bumps into two of his old enemies, who plan to rob a toy store.	Disney+, Amazon Prime Video, Hulu	https://youtu.be/5h9VDUNtoto?si=B0bqZ_SQxU9Exswt	0	farhan	1	Macaulay Culkin, Joe Pesci, Daniel Stern, Catherine O'Hara, John Heard, Tim Curry, Brenda Fricker, Eddie Bracken, Rob Schneider
122	Home Alone 3	\N	https://upload.wikimedia.org/wikipedia/en/c/cc/Home_Alone_3_film.jpg	1997	Alex Pruitt, an 8-year-old boy living in Chicago, must fend off international spies who seek a top-secret computer chip in his toy car.	Disney+, Amazon Prime Video	https://youtu.be/PP--dDh4axI?si=OV6lgDXfIUOAD8Qk	0	farhan	1	Alex D. Linz, Olek Krupa, Rya Kihlstedt, Lenny von Dohlen, David Thornton, Haviland Morris, Kevin Kilner, Marian Seldes, Scarlett Johansson
123	Despicable Me	\N	https://xl.movieposterdb.com/10_06/2010/1323594/xl_1323594_2b69270c.jpg?v=2024-08-05%2013:30:11	2010	In a happy suburban neighborhood surrounded by white picket fences with flowering rose bushes, sits a black house with a dead lawn. Unbeknownst to the neighbors, hidden beneath this house is a vast secret hideout. Surrounded by a small army of minions, we discover Gru (Steve Carell), planning the biggest heist in the history of the world. He is going to steal the moon. Gru delights in all things wicked. Armed with his arsenal of shrink rays, freeze rays, and battle-ready vehicles for land and air, he vanquishes all who stand in his way. Until the day he encounters the immense will of three little orphaned girls who look at him and see something that no one else has ever seen: a potential Dad. The world's greatest villain has just met his greatest challenge: three little girls named Margo (Miranda Cosgrove), Edith (Dana Gaier), and Agnes (Elsie Fisher).	Netflix	https://youtu.be/zzCZ1W_CUoI?si=9zVVTZI8tBr7SxkQ	0	farhan	1	Steve Carell, Jason Segel, Russell Brand, Julie Andrews, Will Arnett, Kristen Wiig, Miranda Cosgrove, Dana Gaier, Elsie Fisher
124	Despicable Me 2	\N	https://xl.movieposterdb.com/15_02/2013/1690953/xl_1690953_473a6949.jpg?v=2024-05-16%2019:32:27	2013	While Gru, the ex-supervillain is adjusting to family life and an attempted honest living in the jam business, a secret Arctic laboratory is stolen. The Anti-Villain League decides it needs an insider's help and recruits Gru in the investigation. Together with the eccentric AVL agent, Lucy Wilde, Gru concludes that his prime suspect is the presumed dead supervillain, El Macho, whose his teenage son is also making the moves on his eldest daughter, Margo. Seemingly blinded by his overprotectiveness of his children and his growing mutual attraction to Lucy, Gru seems on the wrong track even as his minions are being quietly kidnapped en masse for some malevolent purpose.	Netflix	https://youtu.be/TlbnGSMJQbQ?si=7fwRoOeiDCimK7Yq	0	farhan	1	Steve Carell, Jason Segel, Russell Brand, Julie Andrews, Will Arnett, Kristen Wiig, Miranda Cosgrove, Dana Gaier, Elsie Fisher
125	Despicable Me 3	\N	https://xl.movieposterdb.com/20_06/2017/3469046/xl_3469046_30126921.jpg?v=2024-08-06%2019:50:11	2017	After he is fired from the Anti-Villain League for failing to take down the latest bad guy to threaten humanity, Gru (Steve Carell) finds himself in the midst of a major identity crisis. But when a mysterious stranger shows up to inform Gru that he has a long-lost twin brother - a brother who desperately wishes to follow in his twin's despicable footsteps - one former supervillain will rediscover just how good it feels to be bad.	Netflix	https://youtu.be/6DBi41reeF0?si=M3-e-Dc0alqjbnZ6	0	farhan	1	Steve Carell, Jason Segel, Russell Brand, Julie Andrews, Will Arnett, Kristen Wiig, Miranda Cosgrove, Dana Gaier, Elsie Fisher
126	Despicable Me 4	\N	https://xl.movieposterdb.com/24_02/2024/7510222/xl_despicable-me-4-movie-poster_3c4ff16e.jpg?v=2024-08-19%2012:46:58	2024	Gru, Lucy, Margo, Edith, and Agnes welcome a new member to the family, Gru Jr., who is intent on tormenting his dad. Gru faces a new nemesis in Maxime Le Mal and his girlfriend Valentina, and the family is forced to go on the run.	\N	https://youtu.be/LtNYaH61dXY?si=iuxTe-GH10U-jktB	0	farhan	1	Steve Carell, Jason Segel, Russell Brand, Julie Andrews, Will Arnett, Kristen Wiig, Miranda Cosgrove, Dana Gaier, Elsie Fisher
127	Minions	\N	https://xl.movieposterdb.com/15_02/2015/2293640/xl_2293640_644af6d9.jpg?v=2024-08-06%2001:11:59	2015	Ever since the dawn of time, the Minions have lived to serve the most despicable of masters. From the T-Rex to Napoleon, the easily distracted tribe has helped the biggest and the baddest of villains. Now, join protective leader Kevin, teenage rebel Stuart, and lovable little Bob on a global road trip. They'll earn a shot to work for a new boss, the world's first female supervillain, and try to save all of Minionkind from annihilation.	Netflix	https://youtu.be/eisKxhjBnZ0?si=6CXztBK0pwJoTU2V	0	farhan	1	Sandra Bullock, Jon Hamm, Michael Keaton, Pierre Coffin, Allison Janney, Steve Coogan, Jennifer, Geoffrey Rush, Steve Carell, Katy Mixon 
128	Pirates of the Caribbean: The Curse of the Black Pearl	\N	https://a.ltrbxd.com/resized/film-poster/2/6/9/5/2695-pirates-of-the-caribbean-the-curse-of-the-black-pearl-0-1000-0-1500-crop.jpg?v=272b36c0d8	2003	This swash-buckling tale follows the quest of Captain Jack Sparrow, a savvy pirate, and Will Turner, a resourceful blacksmith, as they search for Elizabeth Swann. Elizabeth, the daughter of the governor and the love of Will's life, has been kidnapped by the feared Captain Barbossa. Little do they know, but the fierce and clever Barbossa has been cursed. He, along with his large crew, are under an ancient curse, doomed for eternity to neither live, nor die. That is, unless a blood sacrifice is made	Hotstar	https://youtu.be/naQr0uTrH_s?si=v4LXSox8FcDrPK6y	0	farhan	1	Johnny Depp, Orlando Bloom, Keira Knightley, Geoffrey Rush, Jack Davenport, Jonathan Pryce, Lee Arenberg
129	Pirates of the Caribbean: Dead Man's Chest	\N	https://a.ltrbxd.com/resized/film-poster/5/1/9/8/9/51989-pirates-of-the-caribbean-dead-man-s-chest-0-1000-0-1500-crop.jpg?v=f9c46ae728	2006	Once again we're plunged into the world of sword fights and savvy pirates. Captain Jack Sparrow is reminded he owes a debt to Davy Jones, who captains the flying Dutchman, a ghostly ship, with a crew from hell. Facing the locker Jack must find the heart of Davy Jones but to save himself he must get the help of quick-witted Will Turner and Elizabeth Swann. If that's not complicated enough, Will and Elizabeth are sentenced to hang, unless Will can get Lord Cutler Beckett Jack's compass. Will is forced to join another crazy adventure with Jack.	Hotstar	https://youtu.be/SNA-Ezahmok?si=Sh13Whh-ESV4Hukc	0	farhan	1	Johnny Depp, Orlando Bloom, Keira Knightley, Geoffrey Rush, Jack Davenport, Jonathan Pryce, Lee Arenberg
147	Ong-Bak 2	The Beginning 	https://image.tmdb.org/t/p/original/dAOREYQcl0qWwpN2SPp4yDUk1VG.jpg	2008	This sequel serves as a prequel to the first film, following the story of a hero born as the son of a ruler who becomes a warrior seeking revenge. The film explores Ting’s journey to avenge his family and combat enemies who have destroyed his life.	Amazon Prime Video, Netflix, \nyoutube	https://youtu.be/lml3uGdL0RM?feature=shared	0	farhan	8	Tony Jaa, Sorapong Chatree, Tatchakorn Boonlapoon
130	Pirates of the Caribbean: At World's End	\N	https://a.ltrbxd.com/resized/film-poster/5/1/7/7/3/51773-pirates-of-the-caribbean-at-world-s-end-0-1000-0-1500-crop.jpg?v=6d572cf726	2007	After losing Jack Sparrow to the locker of Davy Jones, the team of Will Turner, Elizabeth Swan and Captain Barbossa make their final alliances with the pirate world to take on the forces of Lord Cutler Beckett and his crew, including Davy Jones, who he now has control over. It's not going to be easy, as they must rescue Sparrow, convince all the pirate lords to join them and defeats Beckett, whilst each individual pirate has their own route which they wish to follow. 	Hotstar	https://youtu.be/HKSZtp_OGHY?si=Yf_jU7WrbUvWgf2n	0	farhan	1	Johnny Depp, Orlando Bloom, Keira Knightley, Geoffrey Rush, Jack Davenport, Jonathan Pryce, Lee Arenberg
131	Pirates of the Caribbean: On Stranger Tides	\N	https://a.ltrbxd.com/resized/film-poster/5/0/7/3/5/50735-pirates-of-the-caribbean-on-stranger-tides-0-1000-0-1500-crop.jpg?v=84b9897282	2011	Captain Jack Sparrow (Johnny Depp) crosses paths with a woman from his past, Angelica (Penélope Cruz), and he's not sure if it's love, or if she's a ruthless con artist who's using him to find the fabled Fountain of Youth. When she forces him aboard the Queen Anne's Revenge, the ship of the formidable pirate Blackbeard (Ian McShane), Jack finds himself on an unexpected adventure in which he doesn't know who to fear more: Blackbeard or the woman from his past.	Hotstar	https://youtu.be/0BXCVe8Yww4?si=J1wWAZ4nziK5UT_U	0	farhan	1	Johnny Depp, Penélope Cruz, Geoffrey Rush, Ian McShane, Kevin McNally, Sam Claflin, Astrid Bergès-Frisbey
132	Pirates of the Caribbean: Dead Men Tell No Tales	\N	https://a.ltrbxd.com/resized/film-poster/1/2/3/0/6/6/123066-pirates-of-the-caribbean-dead-men-tell-no-tales-0-1000-0-1500-crop.jpg?v=67c23b3308	2017	Captain Jack Sparrow (Johnny Depp) finds the winds of ill-fortune blowing even more strongly when deadly ghost pirates led by his old nemesis, the terrifying Captain Salazar (Javier Bardem), escape from the Devil's Triangle, determined to kill every pirate at sea...including him. Captain Jack's only hope of survival lies in seeking out the legendary Trident of Poseidon, a powerful artifact that bestows upon its possessor total control over the seas.	Hotstar	https://youtu.be/Hgeu5rhoxxY?si=skbqzd6mgLHh4Fio	0	farhan	1	Johnny Depp, Javier Bardem, Geoffrey Rush, Brenton Thwaites, Kaya Scodelario, Kevin McNally
133	Tokidoki Bosotto Russia-go de Dereru Tonari no Alya-san	Alya Sometimes Hides Her Feelings in Russian	https://cdn.myanimelist.net/images/anime/1825/142258.jpg	2024	Seirei Academy is a prestigious school attended by the very best students in Japan. Alisa Mikhailovna Alya Kujou, the half-Russian and half-Japanese treasurer of the school's student council, is known for her intelligence, stunning looks, and rigid personality. Contrasting her near-flawless persona, Alya's unmotivated classmate Masachika Kuze slacks off during lessons and seems to show no interest in her.\n\nInitially irritated, Alya gradually becomes more intrigued by Masachika and starts expressing her affection for him in Russian. However, she is oblivious to his secret—he understands the language fluently! Due to a childhood friend who was temporarily staying in Japan, Masachika has been studying Russian in hopes of reuniting with her.\n\nAs the two spend more time together, the playful and eccentric relationship between them quickly deepens. In the meantime, both must learn to navigate their new growing feelings for one another.	Cruncyroll	https://www.youtube.com/watch?v=pBX6TtOlYow	0	farhan	3	Sumire Uesaka, Kouhei Amasaki, Wakana Maruoka, Yukiyo Fujii, Saya Aizawa
134	Godzilla x Kong: The New Empire	\N	https://posters.movieposterdb.com/24_03/2024/14539740/s_godzilla-x-kong-the-new-empire-movie-poster_df4bd47b.jpg	2024	Two ancient titans, Godzilla and Kong, clash in an epic battle as humans unravel their intertwined origins and connection to Skull Island's mysteries.	Netflix	https://www.youtube.com/watch?v=lV1OOlGwExM	0	farhan	1	Rebecca Hall, Brian Tyree Henry, Dan Stevens
135	Kiss x Sis	\N	https://cdn.myanimelist.net/images/anime/1660/121553.jpg	2010	After Keita Suminoe's mother passed away, his father promptly remarried, introducing two step-sisters into Keita's life: twins Ako and Riko. But since their fateful first encounter, a surge of incestuous love for their younger brother overcame the girls, beginning a lifelong feud for his heart.\n\nNow at the end of his middle school career, Keita studies fervently to be able to attend Ako and Riko's high school. While doing so however, he must resolve his conflicting feelings for his siblings and either reject or succumb to his sisters' intimate advances. Fortunately—or perhaps unfortunately for Keita—his sisters aren't the only women lusting after him, and there's no telling when the allure of temptation will get the better of the boy as well.	BiliBili	https://youtu.be/hemw2TBFtP8	0	farhan	3	Yuiko Tatsumi, Ayana Taketatsu, Ken Takeuchi
136	Shingeki no Kyojin Season 3 Part 2	Attack on Titan Season 3 Part 2	https://cdn.myanimelist.net/images/anime/1517/100633.jpg	2019	Seeking to restore humanity's diminishing hope, the Survey Corps embark on a mission to retake Wall Maria, where the battle against the merciless Titans takes the stage once again.\n\nReturning to the tattered Shiganshina District that was once his home, Eren Yeager and the Corps find the town oddly unoccupied by Titans. Even after the outer gate is plugged, they strangely encounter no opposition. The mission progresses smoothly until Armin Arlert, highly suspicious of the enemy's absence, discovers distressing signs of a potential scheme against them.\n\nShingeki no Kyojin Season 3 Part 2 follows Eren as he vows to take back everything that was once his. Alongside him, the Survey Corps strive—through countless sacrifices—to carve a path towards victory and uncover the secrets locked away in the Yeager family's basement.	Netflix	https://youtu.be/hKHepjfj5Tw	0	farhan	3	Hiroshi Kamiya, Yuuki Kaji, Yui Ishikawa
137	Annabelle	\N	https://posters.movieposterdb.com/14_09/2014/3322940/l_3322940_9caff983.jpg	2014	A couple begins to experience terrifying supernatural occurrences involving a vintage doll shortly after their home is invaded by satanic cultists.	Netflix	https://www.youtube.com/watch?v=paFgQNPGlsg	0	farhan	1	Ward Horton, Annabelle Wallis, Alfre Woodard
148	Ong-Bak 3	\N	https://es.web.img3.acsta.net/r_1280_720/medias/nmedia/18/82/35/79/19840043.jpg 	2010	This film continues from Ong Bak 2, with Ting now as a ruler striving to restore honor and peace to his kingdom after various conflicts. Ting must confront enemies and challenges to save his village.	Amazon Prime Video, Netflix, \nyoutube	https://youtu.be/ELXzjJ1RiWA?feature=shared\n	0	farhan	8	Tony Jaa, Nirut Sirichanya, Sarunyu Wongkrachang\n
149	Pee Mak Phrakanong	\N	https://xl.movieposterdb.com/13_04/2013/2776344/xl_2776344_a3e9a2f0.jpg?v=2024-09-06%2003:26:37	2013	After serving in the war, Mak invites his four soldier friends to his home. Upon arrival they witness the village terrified of a ghost. The four friends hear rumors that the ghost is Mak's wife Nak. Based on Thai folklore.	Netflix	https://www.youtube.com/watch?v=B9xbj_UK1pc	0	farhan	8	Mario Maurer, Davika Hoorne, Nattapong Chartpong
138	InuYasha	\N	https://cdn.myanimelist.net/images/anime/1589/95329.jpg	2000	Kagome Higurashi's 15th birthday takes a sudden turn when she is forcefully pulled by a demon into the old well of her family's shrine. Brought to the past, when demons were a common sight in feudal Japan, Kagome finds herself persistently hunted by these vile creatures, all yearning for an item she unknowingly carries: the Shikon Jewel, a small sphere holding extraordinary power. Amid such a predicament, Kagome encounters a half-demon boy named Inuyasha who mistakes her for Kikyou, a shrine maiden he seems to resent. Because of her resemblance to Kikyou, Inuyasha takes a violent dislike to Kagome. However, after realizing the dire circumstances they are both in, he sets aside his hostility and lends her a hand. Unfortunately, during a fight for the Shikon Jewel, the miraculous object ends up shattered into pieces and scattered across the land. Fearing the disastrous consequences of this accident, Kagome and Inuyasha set out on a challenging quest to recover the shards before they fall into the wrong hands.	Hulu	https://youtu.be/n5f47FVUlrs	0	farhan	3	Yamaguchi Kappei, Yukino Satsuki, Kuwashima Houko, Tsujitani Kouji, Hidaka Noriko, Watanabe Kumiko, Oogami Izumi, Morikawa Toshiyuki, Narita Ken
139	InuYasha: Kanketsu-hen	InuYasha: The Final Act	https://cdn.myanimelist.net/images/anime/7/75570.jpg	2009	Thwarted again by Naraku, Inuyasha, Kagome Higurashi, and their friends must continue their hunt for the few remaining Shikon Jewel shards, lest they fully form into a corrupted jewel at the hands of Naraku. But Naraku has plans of his own to acquire them, and will destroy anyone and anything standing in his way—even his own underlings. The persistent, unyielding danger posed by Naraku forces Sango and Miroku to decide what is most important to them—each other or their duty in battle. Meanwhile, Inuyasha must decide whether his heart lies with Kikyou or Kagome, before fate decides for him. Amid the race to find the shards, Inuyasha and his brother Sesshoumaru must also resolve their feud and cooperate for their final confrontation with Naraku, as it is a battle they must win in order to put a stop to his evil and cruelty once and for all.	Hulu	https://youtu.be/BcAuqVLCsZE	0	farhan	3	Yamaguchi Kappei, Yukino Satsuki, Kuwashima Houko, Tsujitani Kouji, Hidaka Noriko, Watanabe Kumiko, Oogami Izumi, Morikawa Toshiyuki, Narita Ken
140	InuYasha Movie 1: Toki wo Koeru Omoi	InuYasha the Movie: Affections Touching Across Time	https://cdn.myanimelist.net/images/anime/1683/94370.jpg	2001	During their quest in the feudal era to recover the shards of the miraculous Shikon Jewel, Inuyasha, Kagome Higurashi, and their friends become the target of Menoumaru Hyouga—a demon awakened by one of the Shikon fragments, now in pursuit of Inuyasha's heirloom sword Tessaiga. Following a clash between the fathers of Inuyasha and Menoumaru, the weapon is the only means to restore Menoumaru his rightful family heritage. However, upon ambushing Inuyasha, Menoumaru discovers that Tessaiga's owner alone can wield it. Determined to achieve his objective regardless, he kidnaps Kagome to force Inuyasha to use his blade and release the sealed powers of the Hyouga clan. With their dependable companions' assistance, Inuyasha and Kagome oppose Menoumaru, unaware that his sinister intentions and alarming potential will endanger not only their world but also its distant future.	Hoopla	https://youtu.be/hGhgHK4xKF4?si=ai_aipVgrpsYm_eZ	0	farhan	3	Yamaguchi Kappei, Yukino Satsuki, Kuwashima Houko, Tsujitani Kouji, Hidaka Noriko, Watanabe Kumiko, Oogami Izumi, Morikawa Toshiyuki, Narita Ken
141	InuYasha Movie 2: Kagami no Naka no Mugenjou	InuYasha the Movie 2: The Castle Beyond the Looking Glass	https://cdn.myanimelist.net/images/anime/1162/92219.jpg	2002	Fortune smiles on Inuyasha and his allies when they finally defeat their nemesis Naraku, who has caused them unrelenting hardships. Overjoyed by the long-awaited victory, they all hurry to resume their former lives, unaware that danger still lurks around. Kanna and Kagura, two of Naraku's subordinates, make arrangements to set free a sealed demonic entity that claims to be Kaguya, the legendary Princess of the Heavens. Although preoccupied with their own endeavors, Inuyasha's group members reunite by a string of unusual coincidences involving Kanna and Kagura along with an inexplicable phenomenon of repeated full-moon nights. Upon realizing that Kaguya is behind the troubling events and that she holds a terrible power, they join forces once more to stop the disastrous fate she has planned for the world.	Hoopla	https://youtu.be/BZiXEbZ9OQg	0	farhan	3	Yamaguchi Kappei, Yukino Satsuki, Kuwashima Houko, Tsujitani Kouji, Hidaka Noriko, Watanabe Kumiko, Oogami Izumi, Morikawa Toshiyuki
142	Hanyou no Yashahime: Sengoku Otogizoushi	Yashahime: Princess Half-Demon	https://cdn.myanimelist.net/images/anime/1005/114781.jpg	2020	Half-demon twins Towa and Setsuna were always together, living happily in Feudal Japan. But their joyous days come to an end when a forest fire separates them and Towa is thrown through a portal to modern-day Japan. There, she is found by Souta Higurashi, who raises her as his daughter after Towa finds herself unable to return to her time. Ten years later, 14-year-old Towa is a relatively well-adjusted student, despite the fact that she often gets into fights. However, unexpected trouble arrives on her doorstep in the form of three visitors from Feudal Japan; Moroha, a bounty hunter; Setsuna, a demon slayer and Towa's long-lost twin sister; and Mistress Three-Eyes, a demon seeking a mystical object. Working together, the girls defeat their foe, but in the process, Towa discovers to her horror that Setsuna has no memory of her at all. Hanyou no Yashahime: Sengoku Otogizoushi follows the three girls as they endeavor to remedy Setsuna's memory loss, as well as discover the truth about their linked destinies.	Youtube Ani One	https://youtu.be/O9c9AWheBdQ	0	farhan	3	Tadokoro Azusa, Matsumoto Sara, Komatsu Mikako, Yamaguchi Kappei, Narita Ken, Yukino Satsuki, Kuwashima Houko, Hidaka Noriko, Yasumura Makoto
143	Record of Youth	The Moment of 18	https://h7.alamy.com/comp/2DA5DMM/record-of-youth-aka-chungchungirok-poster-from-left-byeon-woo-seok-park-so-dam-park-bo-gum-season-1-premiered-in-the-us-sep-7-2020-photo-netflix-courtesy-everett-collection-2DA5DMM.jpg	2020	The series follows the lives of three young adults as they navigate the challenges of pursuing their dreams in the competitive world of entertainment and fashion while dealing with love, friendship, and family.	Netflix	https://youtu.be/tahWtPeNkM0	0	farhan	0	Park Bo-gum, Park So-dam, Byeon Woo-seok
144	Start-Up	Sandbox	https://cinemags.org/?attachment_id=159160	2020	Start-Up is set in the fictional South Korean Silicon Valley called Sandbox and follows the story of young entrepreneurs striving to build their own companies, navigating challenges in business and relationships.	Netflix	https://youtu.be/QLiAdBBAVxI	0	farhan	0	Bae Suzy, Nam Joo-hyuk, Kim Seon-ho, Kang Han-na
145	Kill It	\N	https://www.movieposterdb.com/kill-it-i9772814	2019	The story revolves around a skilled assassin who secretly works as a veterinarian and embarks on a journey to find his true identity while being pursued by a detective who is determined to catch him.	Viki, Amazon Prime	https://www.youtube.com/watch?v=bHhxocusS7M	0	farhan	0	Jang Ki-yong, Nana
150	Top Secret: Wai roon pun lan	\N	https://xl.movieposterdb.com/12_03/2011/2292955/xl_2292955_4e3dd665.jpg	2011	Teen gamer turned businessman launches bestselling seaweed snack brand after family bankruptcy, earning 800 million baht yearly revenue by age 26.	Netflix	https://www.youtube.com/watch?v=3jocFB7TZaQ	0	farhan	8	Pachara Chirathivat, Walanlak Kumsuwan, Somboonsuk Niyomsiri
151	SuckSeed: Huay Khan Thep	\N	https://media-cache.cinematerial.com/p/500x/rumdotbn/suckseed-huay-khan-thep-thai-movie-poster.jpg?v=1576006547	2011	As a young boy, Ped was a geeky kid who held a crush on classmate Ern. When Ern moved away with her family to Bangkok, Ped was crushed. Now in high school, Ped and Ern are reunited after she backs to her hometown and attends the same school. Ped's best friend Koong then hatches a plan to get the attention of Ern and other girls. They will form a rock band! The boys are in for a bigger surprise when they learn Ern is a talented guitarist and joins their band. A talent show competition looms ahead for the band, while Ped and Koong find themselves vying for the attention of Ern ....	Netflix	https://www.youtube.com/watch?v=GEgbtJV1D7w	0	farhan	8	Jirayu La-ongmanee, Pachara Chirathivat, Nattasha Nauljam
153	Rot fai faa... Maha na ter	\N	https://xl.movieposterdb.com/11_04/2009/1621642/xl_1621642_8ef2bf4a.jpg	2009	An urban love story set in the center of Bangkok where 30-year-old Mei Li is struggling to find true love. When Mei Li accidentally meets a handsome BTS engineer whom she considers the right man, she plans to make her first move. Though too many obstacles keep popping up, Mei Li will never give up.	Netflix	https://www.youtube.com/watch?v=ZSMUF8izOJM	0	farhan	8	Sirin Horwang, Theeradej Wongpuapan, Ungsumalynn Sirapatsakmetha
157	asd	asd		2022	asd	asd	\N	\N	\N	1	asd
152	Seasons change: Phror arkad plian plang boi	\N	https://xl.movieposterdb.com/12_02/2006/880477/xl_880477_1c18464f.jpg	2006	The story takes place at the College of Music, Mahidol University over one year and covers the three seasons that Bangkok typically experiences - summer, winter and monsoon. It chronicles the life of a young high school student, Pom, and his impulsive decision to attend a music school, unknown to his parents, because of a girl he has secretly liked for three years, Dao. At the music school, he befriends Aom, who eventually becomes his best friend at the academy. As a talented rock drummer he aids a wise Japanese instructor, Jitaro in research. He also forms a rock band with two friends, Ched and Chat. However, in order to become closer to the talented violinist Dao, he joins the orchestra and is assigned by the feisty conductor, Rosie, to play timpani. Eventually, as time schedule collides, he is forced to choose between playing in a rock band or the orchestra, and is also forced to choose between his crush on Dao, or his best friend, Aom.	Netflix	https://www.youtube.com/watch?v=ophEFZt9iiU	0	farhan	8	Yuwanat Arayanimisakul, Panisara Arayaskul, Witawat Singlampong
167	tes_image	image	https://i.imgur.com/x5dnKwD.jpeg	2022	asd	asd	\N	\N	\N	0	asd
169	kita		https://i.imgur.com/DH6q6Tj.jpeg				\N	\N	\N	0	
178	farhan	farhan	https://i.imgur.com/usCs2rd.jpeg	2022	edited farhan	asd	asd	\N	\N	4	{"14"}
176	input	input	\N	2023	adited	asd	asd	\N	\N	2	{"Alisha Boe"}
177	asd	asd	\N	2024	asdedited	asd	asd	\N	\N	2	{"4","14"}
179	farhan drama v2	drama farhan	\N	2024	tentang farhan v2	Netflix	no	\N	\N	2	{"4"}
\.


--
-- Data for Name: genre; Type: TABLE DATA; Schema: public; Owner: myuser
--

COPY public.genre (id, genre) FROM stdin;
0	Romance                                                                                                                                                                                                                                                        
2	Comedy                                                                                                                                                                                                                                                         
3	Action                                                                                                                                                                                                                                                         
4	Drama                                                                                                                                                                                                                                                          
5	Romance                                                                                                                                                                                                                                                        
6	Crime                                                                                                                                                                                                                                                          
7	Mystery                                                                                                                                                                                                                                                        
8	Sci-Fi                                                                                                                                                                                                                                                         
9	Thriller                                                                                                                                                                                                                                                       
10	Dark Comedy                                                                                                                                                                                                                                                    
11	Superhero                                                                                                                                                                                                                                                      
12	Coming of Age                                                                                                                                                                                                                                                  
13	Heist                                                                                                                                                                                                                                                          
14	Dark Fantasy                                                                                                                                                                                                                                                   
15	Horror                                                                                                                                                                                                                                                         
16	Survival                                                                                                                                                                                                                                                       
17	Fantasy                                                                                                                                                                                                                                                        
18	Animation                                                                                                                                                                                                                                                      
19	Time Travel                                                                                                                                                                                                                                                    
20	Crime drama                                                                                                                                                                                                                                                    
21	Musical                                                                                                                                                                                                                                                        
22	Adaptation                                                                                                                                                                                                                                                     
23	Family                                                                                                                                                                                                                                                         
24	quest                                                                                                                                                                                                                                                          
25	\N
26	music                                                                                                                                                                                                                                                          
27	Classic                                                                                                                                                                                                                                                        
28	Black comedy                                                                                                                                                                                                                                                   
29	Satire                                                                                                                                                                                                                                                         
30	Tragicomedy.                                                                                                                                                                                                                                                   
31	Biography                                                                                                                                                                                                                                                      
32	History                                                                                                                                                                                                                                                        
33	Anime                                                                                                                                                                                                                                                          
34	Boxing                                                                                                                                                                                                                                                         
35	Sport                                                                                                                                                                                                                                                          
36	Super-natural                                                                                                                                                                                                                                                  
37	Psychological Drama                                                                                                                                                                                                                                            
38	Psychological Horror                                                                                                                                                                                                                                           
39	Supernatural Horror                                                                                                                                                                                                                                            
40	Slice of Life                                                                                                                                                                                                                                                  
41	Tragedy                                                                                                                                                                                                                                                        
42	Psychological Thriller                                                                                                                                                                                                                                         
43	Serial Killer                                                                                                                                                                                                                                                  
44	Advanture                                                                                                                                                                                                                                                      
45	Horor                                                                                                                                                                                                                                                          
46	Supernatural                                                                                                                                                                                                                                                   
47	Kaiju                                                                                                                                                                                                                                                          
48	Globerotting Adventure                                                                                                                                                                                                                                         
49	Suspense Mystery                                                                                                                                                                                                                                               
50	Family Sci-Fi                                                                                                                                                                                                                                                  
51	Ecchi                                                                                                                                                                                                                                                          
52	Suspense                                                                                                                                                                                                                                                       
53	Martial Arts                                                                                                                                                                                                                                                   
1	Adventure                                                                                                                                                                                                                                                      
\.


--
-- Data for Name: genrev2; Type: TABLE DATA; Schema: public; Owner: myuser
--

COPY public.genrev2 (id, genre_name) FROM stdin;
0	Romance
1	Adventure
2	Comedy
3	Action
4	Drama
5	Romance
6	Crime
7	Mystery
8	Sci-Fi
9	Thriller
10	Dark Comedy
11	Superhero
12	Coming of Age
13	Heist
14	Dark Fantasy
15	Horror
16	Survival
17	Fantasy
18	Animation
19	Time Travel
20	Crime drama
21	Musical
22	Adaptation
23	Family
24	quest
25	\N
26	music
27	Classic
28	Black comedy
29	Satire
30	Tragicomedy.
31	Biography
32	History
33	Anime
34	Boxing
35	Sport
36	Super-natural
37	Psychological Drama
38	Psychological Horror
39	Supernatural Horror
40	Slice of Life
41	Tragedy
42	Psychological Thriller
43	Serial Killer
44	Advanture
45	Horor
46	Supernatural
47	Kaiju
48	Globerotting Adventure
49	Suspense Mystery
50	Family Sci-Fi
51	Ecchi
52	Suspense
53	Martial Arts
54	Kung Fu
\.


--
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: myuser
--

COPY public.roles (id, role_name) FROM stdin;
0	admin
1	user
\.


--
-- Data for Name: user_watchlist; Type: TABLE DATA; Schema: public; Owner: myuser
--

COPY public.user_watchlist (user_id, drama_id) FROM stdin;
4	12
5	112
5	78
3	11
2	12
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: myuser
--

COPY public.users (id, username, password, email, role_id, created_at, status) FROM stdin;
0	admin	$2a$10$T.oACy2JyaM28eswuddT8ub3rbeflFT7dL6f9qcm3IDGO1eNjrHLa	farhan.mluthfi01@gmail.com	0	2024-10-12	\N
3	bujank	\N	frhmlbihun@gmail.com	1	2024-10-14	\N
4	bujangers	$2a$10$WvNtaZCIjfmExHRHmNrj..6NfsJeP5xET6SBjpzdwLpRmHqCt4l3G	haha@gmail.com	1	2024-10-14	\N
5	hai	$2a$10$Pcovjizv.bVgz1EBVcip/uXYaNK8ctGN3dv8zQyGJYn1RrCx8tVCC	hah1a@gmail.com	1	2024-10-14	\N
6	farhan	$2a$10$7IoRyMvbB6s1QYIzS9NwQ.XULSucjbZQz1yyPj5F2Ai8d5v0CMJya	farhan@gmail.com	1	2024-10-14	\N
7	3B_039_FARHAN	\N	farhan.muhammad.tif422@polban.ac.id	1	2024-11-11	\N
8	qwerty	$2a$10$LuTkYbquo2PgIqfugUKvle1Dl/gfjrFBw2Qi44eF0eXIyAL756P3y	asd@gmail.com	1	2024-11-11	banned
2	user	$2a$10$sJQMiyeXlPVMiDHbzdWGauOX7Uf3hIKmLyi7xMlJAGsVVSCvrzWY6	user@gmail.com	1	2024-10-13	\N
\.


--
-- Name: actor_id_seq; Type: SEQUENCE SET; Schema: public; Owner: myuser
--

SELECT pg_catalog.setval('public.actor_id_seq', 18, true);


--
-- Name: award_id_seq; Type: SEQUENCE SET; Schema: public; Owner: myuser
--

SELECT pg_catalog.setval('public.award_id_seq', 116, false);


--
-- Name: comments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: myuser
--

SELECT pg_catalog.setval('public.comments_id_seq', 11, true);


--
-- Name: country_id_seq; Type: SEQUENCE SET; Schema: public; Owner: myuser
--

SELECT pg_catalog.setval('public.country_id_seq', 9, true);


--
-- Name: dramas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: myuser
--

SELECT pg_catalog.setval('public.dramas_id_seq', 2, true);


--
-- Name: dramav2_id_seq; Type: SEQUENCE SET; Schema: public; Owner: myuser
--

SELECT pg_catalog.setval('public.dramav2_id_seq', 179, true);


--
-- Name: genrev2_id_seq; Type: SEQUENCE SET; Schema: public; Owner: myuser
--

SELECT pg_catalog.setval('public.genrev2_id_seq', 54, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: myuser
--

SELECT pg_catalog.setval('public.users_id_seq', 8, true);


--
-- Name: actor actor_pkey; Type: CONSTRAINT; Schema: public; Owner: myuser
--

ALTER TABLE ONLY public.actor
    ADD CONSTRAINT actor_pkey PRIMARY KEY (id);


--
-- Name: award award_pkey; Type: CONSTRAINT; Schema: public; Owner: myuser
--

ALTER TABLE ONLY public.award
    ADD CONSTRAINT award_pkey PRIMARY KEY (id);


--
-- Name: comments comments_pkey; Type: CONSTRAINT; Schema: public; Owner: myuser
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (id);


--
-- Name: country country_pkey; Type: CONSTRAINT; Schema: public; Owner: myuser
--

ALTER TABLE ONLY public.country
    ADD CONSTRAINT country_pkey PRIMARY KEY (id);


--
-- Name: drama_actor drama_actor_pkey; Type: CONSTRAINT; Schema: public; Owner: myuser
--

ALTER TABLE ONLY public.drama_actor
    ADD CONSTRAINT drama_actor_pkey PRIMARY KEY (drama_id, actor_id);


--
-- Name: drama_award drama_award_pkey; Type: CONSTRAINT; Schema: public; Owner: myuser
--

ALTER TABLE ONLY public.drama_award
    ADD CONSTRAINT drama_award_pkey PRIMARY KEY (drama_id, award_id);


--
-- Name: drama_genre drama_genre_pkey; Type: CONSTRAINT; Schema: public; Owner: myuser
--

ALTER TABLE ONLY public.drama_genre
    ADD CONSTRAINT drama_genre_pkey PRIMARY KEY (drama_id, genre_id);


--
-- Name: drama dramas_pkey; Type: CONSTRAINT; Schema: public; Owner: myuser
--

ALTER TABLE ONLY public.drama
    ADD CONSTRAINT dramas_pkey PRIMARY KEY (id);


--
-- Name: dramav2 dramav2_pkey; Type: CONSTRAINT; Schema: public; Owner: myuser
--

ALTER TABLE ONLY public.dramav2
    ADD CONSTRAINT dramav2_pkey PRIMARY KEY (id);


--
-- Name: genre genre_pkey; Type: CONSTRAINT; Schema: public; Owner: myuser
--

ALTER TABLE ONLY public.genre
    ADD CONSTRAINT genre_pkey PRIMARY KEY (id);


--
-- Name: genrev2 genrev2_pkey; Type: CONSTRAINT; Schema: public; Owner: myuser
--

ALTER TABLE ONLY public.genrev2
    ADD CONSTRAINT genrev2_pkey PRIMARY KEY (id);


--
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: myuser
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);


--
-- Name: user_watchlist user_watchlist_pkey; Type: CONSTRAINT; Schema: public; Owner: myuser
--

ALTER TABLE ONLY public.user_watchlist
    ADD CONSTRAINT user_watchlist_pkey PRIMARY KEY (user_id, drama_id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: myuser
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: drama_award award_id; Type: FK CONSTRAINT; Schema: public; Owner: myuser
--

ALTER TABLE ONLY public.drama_award
    ADD CONSTRAINT award_id FOREIGN KEY (award_id) REFERENCES public.award(id) NOT VALID;


--
-- Name: actor country_fk; Type: FK CONSTRAINT; Schema: public; Owner: myuser
--

ALTER TABLE ONLY public.actor
    ADD CONSTRAINT country_fk FOREIGN KEY (country_id) REFERENCES public.country(id) NOT VALID;


--
-- Name: drama country_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: myuser
--

ALTER TABLE ONLY public.drama
    ADD CONSTRAINT country_id_fk FOREIGN KEY (country_id) REFERENCES public.country(id) NOT VALID;


--
-- Name: drama_award drama_fk; Type: FK CONSTRAINT; Schema: public; Owner: myuser
--

ALTER TABLE ONLY public.drama_award
    ADD CONSTRAINT drama_fk FOREIGN KEY (drama_id) REFERENCES public.drama(id);


--
-- Name: user_watchlist drama_fk; Type: FK CONSTRAINT; Schema: public; Owner: myuser
--

ALTER TABLE ONLY public.user_watchlist
    ADD CONSTRAINT drama_fk FOREIGN KEY (drama_id) REFERENCES public.dramav2(id);


--
-- Name: drama_genre drama_fk; Type: FK CONSTRAINT; Schema: public; Owner: myuser
--

ALTER TABLE ONLY public.drama_genre
    ADD CONSTRAINT drama_fk FOREIGN KEY (drama_id) REFERENCES public.dramav2(id) NOT VALID;


--
-- Name: comments fk_drama_id; Type: FK CONSTRAINT; Schema: public; Owner: myuser
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT fk_drama_id FOREIGN KEY (drama_id) REFERENCES public.dramav2(id) NOT VALID;


--
-- Name: comments fk_user_id; Type: FK CONSTRAINT; Schema: public; Owner: myuser
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES public.users(id) NOT VALID;


--
-- Name: drama_genre genre_fk; Type: FK CONSTRAINT; Schema: public; Owner: myuser
--

ALTER TABLE ONLY public.drama_genre
    ADD CONSTRAINT genre_fk FOREIGN KEY (genre_id) REFERENCES public.genrev2(id) NOT VALID;


--
-- Name: users role_fk; Type: FK CONSTRAINT; Schema: public; Owner: myuser
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT role_fk FOREIGN KEY (role_id) REFERENCES public.roles(id) NOT VALID;


--
-- Name: user_watchlist user_fk; Type: FK CONSTRAINT; Schema: public; Owner: myuser
--

ALTER TABLE ONLY public.user_watchlist
    ADD CONSTRAINT user_fk FOREIGN KEY (user_id) REFERENCES public.users(id) NOT VALID;


--
-- PostgreSQL database dump complete
--

