const ru = {
    auth: {
       createAccout: {
           accoutToCreate: 'Создать аккаунт',
           enter: 'Вход',
           phoneNumber: 'Тел.номер',
           userName: 'Имя пользователя',
           age: 'Возраст',
           nextStep: `Перейти дальше`
       },
       enterPassword: {
           createPassword: `Придумайте пароль`,
           securePassword: `В целях безопасности ваш пароль должен состоять из 6 или более символов.`,
           passwordLabel: 'Пароль',
           passwordAgainLabel: 'Повторите пароль',
           register: 'Регистрация',
           validateMessage1: `Поле пароля не может быть пустым!`,
           validateMessage2: `пароли не совпадают`,
       },
       login: {
            signInMessage: 'Ошибка логина или пароля',
            enter: 'Вход',
            recovery: 'Восстановить пароль',
            register: `Регистрация`,
            labelPhone: 'Тел.номер',
            labelPassword: 'Пароль',
            newLabelPassword: 'Введите новый пароль',
            restorePassword: 'Bосстановить пароль'
       },
       verifyPhone: {
           sentPassword: 'Введите код, отправленный на ваш номер телефона',
           restorePassword: 'Bосстановить парол',
           confirm: 'Подтверждение',
           sendSms: `Отправить смс`,
           resend: `Переотправьте код`,

       }
    },
    categories: {
        category: {
            all: 'Bce'
        },
        categoryHeader: {
            categories: 'Kатегории'
        }
    },
    comments: {
        commentItem: {
            noComment: 'Комментариев не осталось',
        },
        comments: {
            comments: 'Комментарии',
            leaveComment: `Оставьте свое мнение или оставьте комментарий, чтобы помочь другим
            Пользователи 23TV решили смотреть Хоббита онлайн
            или нет.`,
            leaveComments: 'Оставить комментарий',
            addComment: 'Добавить'
        }
    },
    filter: {
        filtering: 'Фильтрация',
        country: 'Страна',
        year: 'год',
        genre: 'Жанр',
        foundMovies: 'Найденные фильмы'
    },
    footer: {
        downloadApp: `Скачать приложение вы можете через:`,
        weOnSocial: 'Мы в социальных сетях',
        movies: 'Фильмы',
        serials: 'Сериалы',
        allCategories: 'Все категории',
        forward: ' Избранное',
        aboutUs: 'O нас',
        aboutCompany: 'O компании',
        ads: ' Реклама',
        forPartners: 'Партнерам',
        vacancies: `Вакансии`,
        techSupport: 'Tехническая поддержка',
        leaveComment: 'Оставить отзыв'
    },
    live: {
        livePlayContainer: {
            nowLive: 'Сейчас в эфире',
            startStream: 'Hачать трансляцию',
            open: 'Oткрыть'
        },
        userLivePlayerContainer: {
            nowLive: 'Сейчас в эфире',
            watchByFollow: `Смотреть по подписке`,
            watchTrailer: `Посмотреть трейлер`,
            open: 'Oткрыть'
        },
        socket: {
            startLive: 'Начать трансляцию',
            stopLive: 'Конец трансляции'
        }
    },
    movie: {
        movieInfo: {
            rating: 'Рейтинг',
            production: 'Произведено',
            releaseDate: 'Дата премьеры',
            countOfMovie: 'Кол-во серий:',
            duration: 'Продолжительность',
            year: 'г',
            min: 'мин',
            open: 'Oткрыть'
        },
        moviePlayerContainer: {
            films: 'Фильмы',
            trailers: 'Трейлеры',
            watchTrailer: 'Посмотреть трейлер',
            watchByFollow: `Смотреть по подписке`,
            name: 'Именование',
            toForwards: 'Избранное',
            send: 'ОТПРАВИТЬ'
        },
        movieItem: {
            genre: 'Жанры'
        }
    },
    navbar: {
        movies: 'Фильмы',
        serials: 'Сериалы',
        allCategories: 'Все категории',
        forwards: 'Избранное',
        settings: 'Настройки аккаунта',
        auth: 'Вход / Регистрация',
        shrift: 'Размеры шрифта',
        smallShrift: 'Маленькие',
        mediumShrift: 'Средние',
        bigShrift: 'Крупные',
        lightMode: 'Светлый режим',
        darkMode: 'Темный режим',
        carton: 'Мультфильмы',
        uzb_films: 'Узбекские фильмы',
        uzb_serials: 'Узбекские сериалы',
        side_films: 'Зарубежные филмы',
        turk_films: 'Турецкие фильмы',
        side_serials: 'Зарубежные сериалы',
        turk_serials: 'Турецкие сериалы',
        prod: 'Передачи',
        consert: 'Концерты'
    },
    notfound: {
        notFound: {
            goToMainPage: 'Вернуться на главную страницу'
        },
        searchNotFound: 'К сожалению, ничего не было найдено',
        videoNotFound: 'Видео не найдено'
    },
    shareMovie: {
        share: 'Поделиться',
        copy: 'Копировать',
        startAt: 'Начать'
    },
    triller: {
        trillerCarousel: {
            triller: 'Трейлер',
            country: 'Страна'
        },
        trillerItem: {
            country: 'Страна',
            rating: 'Рейтинг',
            watchByFollow: `
            Смотреть по подписке`
        },
        trillerPlayer: {
            loading: 'Загрузка видео Подождите, пока видео загрузится ...'
        }
    },
    user: {
        following: {
            actual: 'Актуальное',
            accessTv: `Получите доступ к более чем 60 телеканалам, таким как ТВ-3, НТВ, Муз-ТВ.
            Планета животных, Perfect TV, Молодежь и многие другие темы
            каналы`,
            chargeDays: 'От 1500 сум за 3 дня'
        },
        profile: {
            nickname: 'Имя',
            balans: 'Баланс',
            price: ' сyм',
            phoneNumber: 'Телефонный номер',
            idNumber: 'ID для платежа',
            editProfile: 'редактировать профиль',
            exit: 'Выход',
            age: 'Возраст',
            nameLabel: 'Твое имя',
            numberLabel: 'Ваш номер телефона',
            oldPassword: 'Введите старый пароль',
            setNewPassword: 'Установите новый пароль',
            labelPassword: 'Придумайте новый пароль',
            retypeNewPassword: 'Повторите новый пароль',
            save: 'Сохранить'
        },
        profileSidebar: {
            accaunt: 'АККАУНТ ',
            follow: 'подпискa',
            payment: 'Оплата',
            history: 'История',
            exit: 'Выход'
        }
    }
}

export default ru
