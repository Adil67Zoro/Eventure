Чтобы инициализировать приложение, сначала откройте терминал в Visual Studio Code и введите: npx create-react-app eventure (если выдает command not found, установите nodejs и попробуйте снова)

После того как все загрузится, откройте файл eventure, и удалите папки public и src. Теперь возьмите папки public и src с моего repository и вставьте в вашу папку.

Введите в терминал "cd .\eventure\". Теперь нужно скачать нужные packages. Напишите следующие команды по одному:

npm i react-router-dom

npm install firebase

npm i react-notifications

И наконец то введите npm start чтобы запустить проект.

Чтобы добавлять или удалять мероприятие, зайдите на сайт https://firebase.google.com/. Нажмите на кнопку Get Started и зайдите в ваш gmail аккаунт. 
Я дал доступ только аккаунту nfactorialincubator2022@gmail.com. Но если хотите зайти через другой аккаунт, у вас не будет доступа, и вам нужно будет со мной связаться чтобы я предоставил доступ другому gmail аккаунту. 

После этого, у вас должно будет отображаться данное сообщение в главном меню: "You have 1 pending project ownership invitation". Нажмите "See invitation". Поставьте нужные галочки и нажмите "Accept 1 invitation". Вас должно сразу перенаправить на главную страницу проекта Eventure. 

На левой стороне экрана будет "Product categories". Нажмите конпку "Build", и выберите "Authentication". Эта категория показывает всех User-ов которые сделают аутентификация через Google аккаунты. Теперь выберите "Firestore Database" (тоже в "Build"). Это Database моего проекта. Как вы можете увидеть, здесь два collection-а: "events" и "users". "events" показывает все документы, в которых содержатся информаций о всех мероприятиях. Чтобы добавить новое мероприятие, нажмите на кнопку "Add document". Введите "Document ID" (желательно одно слово) и создайте следующие field-ы: name(string)-название мероприятия, date(string)-день и время, address(string)-адрес, img(string)-фото, people(array)-юзеры которые забронировали место на это мероприятие, current(number)-число людей которые уже забронировали (напишите 0 в самом начале), total(number)-общее количество мест, и id(string)-напишите то что написали в "Document ID". 

В collection-e "users" находятся все юзеры которые сделали аутентификацию. Сюда добавлять ничего не надо, код сам будет добавлять юзеров. 

****Процесс проектирования и разработки****
Для данного проекта я использовал React.js для фронтенда, Firebase для бэкенда и управления базой данных, а также библиотеку react-notifications для уведомлений. 
Само приложение разделено на три компонента: Home(/), где показываются все мероприятия и функционал чтобы забронировать свое место, Header, где находятся кнопки чтобы зайти в гугл аккаунт и перейти в профиль, и Profile(/), где отображаются все забронированные мероприятия, функционал чтобы отменить свое забронирование и кнопка чтобы выйти из своей учетной записи. 

****Проблемы в приложении****
Как вы можете заметить, у меня отсутсвует функция добавления мероприятия в Goole Calendar потому что чтобы использовать google calendar api, нужно создать новый index.html файл и вставить туда нужные скрипты, но проблема в том что когда react создает приложение, дефолтный index.html файл уже создается и когда я удалял этот index.html чтобы создать новый для google calendar api, у меня выдовало ошибку потому что этот index.html созданный react-ом является объязательным чтобы проект запускался. Чтобы решить данную проблему, я перепробовал все другие алтернативные приложения как microsoft outlook calendar api, zoho calendar api, clickUp api и т.д., но безуспешно. А так же вы можете заметить что дизайн сайта конечно не самый лучший потому что я как дизайнер не так хорош. Надеюсь что я улучшу данный навык на ваших оффлайн лекциях по UI/UX-дизайн на летнем инкубаторе. 
