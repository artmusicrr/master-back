PGDMP      ,                }            store    16.3 (Debian 16.3-1.pgdg120+1)    16.3 (Debian 16.3-1.pgdg120+1) 7    f           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            g           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            h           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            i           1262    16384    store    DATABASE     p   CREATE DATABASE store WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';
    DROP DATABASE store;
                postgres    false            �            1255    40976    update_updatedat_column()    FUNCTION     �   CREATE FUNCTION public.update_updatedat_column() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    NEW.updatedAt = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$;
 0   DROP FUNCTION public.update_updatedat_column();
       public          postgres    false            �            1259    40977 
   adm_slider    TABLE     �  CREATE TABLE public.adm_slider (
    id integer NOT NULL,
    text text,
    title character varying(255),
    sub_title character varying(255),
    any_text text,
    color_title character varying(255),
    color_text character varying(255),
    color_sub_title character varying(255),
    color_any_text character varying(255),
    font_size_title integer,
    font_size_sub_title integer,
    font_size_text integer,
    image_url character varying(255),
    font_family_title character varying(255),
    font_family_sub_title character varying(255),
    font_family_text character varying(255),
    font_weight_title character varying(255),
    font_weight_sub_title character varying(255),
    font_weight_text character varying(255)
);
    DROP TABLE public.adm_slider;
       public         heap    postgres    false            �            1259    65553    contact_form    TABLE     z  CREATE TABLE public.contact_form (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    phone_number character varying(20),
    event_location character varying(255),
    event_date date,
    event_type character varying(255),
    message text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
     DROP TABLE public.contact_form;
       public         heap    postgres    false            �            1259    65552    contact_form_id_seq    SEQUENCE     �   CREATE SEQUENCE public.contact_form_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.contact_form_id_seq;
       public          postgres    false    227            j           0    0    contact_form_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.contact_form_id_seq OWNED BY public.contact_form.id;
          public          postgres    false    226            �            1259    40982    images    TABLE     �   CREATE TABLE public.images (
    id_image integer NOT NULL,
    image_url character varying(255),
    description text,
    ts_insert timestamp without time zone DEFAULT now()
);
    DROP TABLE public.images;
       public         heap    postgres    false            �            1259    40987    images_id_image_seq    SEQUENCE     �   CREATE SEQUENCE public.images_id_image_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.images_id_image_seq;
       public          postgres    false    220            k           0    0    images_id_image_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.images_id_image_seq OWNED BY public.images.id_image;
          public          postgres    false    221            �            1259    24592    text_title_id_text_seq    SEQUENCE     �   CREATE SEQUENCE public.text_title_id_text_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.text_title_id_text_seq;
       public          postgres    false    219            l           0    0    text_title_id_text_seq    SEQUENCE OWNED BY     L   ALTER SEQUENCE public.text_title_id_text_seq OWNED BY public.adm_slider.id;
          public          postgres    false    217            �            1259    24593 
   text_title    TABLE     �   CREATE TABLE public.text_title (
    id_text integer DEFAULT nextval('public.text_title_id_text_seq'::regclass) NOT NULL,
    text text,
    title character varying(255),
    sub_title character varying(255),
    any_text text
);
    DROP TABLE public.text_title;
       public         heap    postgres    false    217            �            1259    40988    user_social    TABLE       CREATE TABLE public.user_social (
    id_user integer NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255),
    avatar character varying(255),
    provider character varying(20) DEFAULT 'local'::character varying NOT NULL,
    providerid character varying(255),
    accesstoken character varying(500),
    createdat timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updatedat timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    isactive boolean DEFAULT true,
    lastlogin timestamp without time zone,
    CONSTRAINT user_social_provider_check CHECK (((provider)::text = ANY (ARRAY[('local'::character varying)::text, ('google'::character varying)::text, ('facebook'::character varying)::text])))
);
    DROP TABLE public.user_social;
       public         heap    postgres    false            �            1259    40998    user_social_auth    TABLE     Y  CREATE TABLE public.user_social_auth (
    id_social_auth integer NOT NULL,
    id_user integer NOT NULL,
    provider character varying(50) NOT NULL,
    provider_user_id character varying(255) NOT NULL,
    access_token text,
    refresh_token text,
    avatar_url text,
    last_login timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
 $   DROP TABLE public.user_social_auth;
       public         heap    postgres    false            �            1259    41004 #   user_social_auth_id_social_auth_seq    SEQUENCE     �   CREATE SEQUENCE public.user_social_auth_id_social_auth_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 :   DROP SEQUENCE public.user_social_auth_id_social_auth_seq;
       public          postgres    false    223            m           0    0 #   user_social_auth_id_social_auth_seq    SEQUENCE OWNED BY     k   ALTER SEQUENCE public.user_social_auth_id_social_auth_seq OWNED BY public.user_social_auth.id_social_auth;
          public          postgres    false    224            �            1259    41005    user_social_id_user_seq    SEQUENCE     �   CREATE SEQUENCE public.user_social_id_user_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.user_social_id_user_seq;
       public          postgres    false    222            n           0    0    user_social_id_user_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.user_social_id_user_seq OWNED BY public.user_social.id_user;
          public          postgres    false    225            �            1259    16389    users    TABLE     �  CREATE TABLE public.users (
    id_user integer NOT NULL,
    name character varying(255),
    email character varying(255),
    registration_date timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    update_date timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    flag_active boolean,
    password character varying(255),
    reset_token character varying(255),
    reset_token_expiration timestamp without time zone
);
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    16396    users_id_user_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_user_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.users_id_user_seq;
       public          postgres    false    215            o           0    0    users_id_user_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.users_id_user_seq OWNED BY public.users.id_user;
          public          postgres    false    216            �           2604    41034    adm_slider id    DEFAULT     s   ALTER TABLE ONLY public.adm_slider ALTER COLUMN id SET DEFAULT nextval('public.text_title_id_text_seq'::regclass);
 <   ALTER TABLE public.adm_slider ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    219    217    219            �           2604    65556    contact_form id    DEFAULT     r   ALTER TABLE ONLY public.contact_form ALTER COLUMN id SET DEFAULT nextval('public.contact_form_id_seq'::regclass);
 >   ALTER TABLE public.contact_form ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    227    226    227            �           2604    41035    images id_image    DEFAULT     r   ALTER TABLE ONLY public.images ALTER COLUMN id_image SET DEFAULT nextval('public.images_id_image_seq'::regclass);
 >   ALTER TABLE public.images ALTER COLUMN id_image DROP DEFAULT;
       public          postgres    false    221    220            �           2604    41036    user_social id_user    DEFAULT     z   ALTER TABLE ONLY public.user_social ALTER COLUMN id_user SET DEFAULT nextval('public.user_social_id_user_seq'::regclass);
 B   ALTER TABLE public.user_social ALTER COLUMN id_user DROP DEFAULT;
       public          postgres    false    225    222            �           2604    41037    user_social_auth id_social_auth    DEFAULT     �   ALTER TABLE ONLY public.user_social_auth ALTER COLUMN id_social_auth SET DEFAULT nextval('public.user_social_auth_id_social_auth_seq'::regclass);
 N   ALTER TABLE public.user_social_auth ALTER COLUMN id_social_auth DROP DEFAULT;
       public          postgres    false    224    223            �           2604    41038    users id_user    DEFAULT     n   ALTER TABLE ONLY public.users ALTER COLUMN id_user SET DEFAULT nextval('public.users_id_user_seq'::regclass);
 <   ALTER TABLE public.users ALTER COLUMN id_user DROP DEFAULT;
       public          postgres    false    216    215            [          0    40977 
   adm_slider 
   TABLE DATA           =  COPY public.adm_slider (id, text, title, sub_title, any_text, color_title, color_text, color_sub_title, color_any_text, font_size_title, font_size_sub_title, font_size_text, image_url, font_family_title, font_family_sub_title, font_family_text, font_weight_title, font_weight_sub_title, font_weight_text) FROM stdin;
    public          postgres    false    219   H       c          0    65553    contact_form 
   TABLE DATA           �   COPY public.contact_form (id, name, email, phone_number, event_location, event_date, event_type, message, created_at) FROM stdin;
    public          postgres    false    227   �L       \          0    40982    images 
   TABLE DATA           M   COPY public.images (id_image, image_url, description, ts_insert) FROM stdin;
    public          postgres    false    220   kN       Z          0    24593 
   text_title 
   TABLE DATA           O   COPY public.text_title (id_text, text, title, sub_title, any_text) FROM stdin;
    public          postgres    false    218   S       ^          0    40988    user_social 
   TABLE DATA           �   COPY public.user_social (id_user, name, email, password, avatar, provider, providerid, accesstoken, createdat, updatedat, isactive, lastlogin) FROM stdin;
    public          postgres    false    222   �T       _          0    40998    user_social_auth 
   TABLE DATA           �   COPY public.user_social_auth (id_social_auth, id_user, provider, provider_user_id, access_token, refresh_token, avatar_url, last_login) FROM stdin;
    public          postgres    false    223   ]U       W          0    16389    users 
   TABLE DATA           �   COPY public.users (id_user, name, email, registration_date, update_date, flag_active, password, reset_token, reset_token_expiration) FROM stdin;
    public          postgres    false    215   zU       p           0    0    contact_form_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.contact_form_id_seq', 21, true);
          public          postgres    false    226            q           0    0    images_id_image_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.images_id_image_seq', 88, true);
          public          postgres    false    221            r           0    0    text_title_id_text_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.text_title_id_text_seq', 6, true);
          public          postgres    false    217            s           0    0 #   user_social_auth_id_social_auth_seq    SEQUENCE SET     R   SELECT pg_catalog.setval('public.user_social_auth_id_social_auth_seq', 1, false);
          public          postgres    false    224            t           0    0    user_social_id_user_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.user_social_id_user_seq', 2, true);
          public          postgres    false    225            u           0    0    users_id_user_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.users_id_user_seq', 47, true);
          public          postgres    false    216            �           2606    41012    adm_slider adm_slider_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.adm_slider
    ADD CONSTRAINT adm_slider_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.adm_slider DROP CONSTRAINT adm_slider_pkey;
       public            postgres    false    219            �           2606    65561    contact_form contact_form_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.contact_form
    ADD CONSTRAINT contact_form_pkey PRIMARY KEY (id);
 H   ALTER TABLE ONLY public.contact_form DROP CONSTRAINT contact_form_pkey;
       public            postgres    false    227            �           2606    41014    images images_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.images
    ADD CONSTRAINT images_pkey PRIMARY KEY (id_image);
 <   ALTER TABLE ONLY public.images DROP CONSTRAINT images_pkey;
       public            postgres    false    220            �           2606    24600    text_title text_title_pkey 
   CONSTRAINT     ]   ALTER TABLE ONLY public.text_title
    ADD CONSTRAINT text_title_pkey PRIMARY KEY (id_text);
 D   ALTER TABLE ONLY public.text_title DROP CONSTRAINT text_title_pkey;
       public            postgres    false    218            �           2606    16401    users unique_email 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT unique_email UNIQUE (email);
 <   ALTER TABLE ONLY public.users DROP CONSTRAINT unique_email;
       public            postgres    false    215            �           2606    41016 %   user_social_auth unique_provider_user 
   CONSTRAINT     v   ALTER TABLE ONLY public.user_social_auth
    ADD CONSTRAINT unique_provider_user UNIQUE (provider, provider_user_id);
 O   ALTER TABLE ONLY public.user_social_auth DROP CONSTRAINT unique_provider_user;
       public            postgres    false    223    223            �           2606    41018 &   user_social_auth user_social_auth_pkey 
   CONSTRAINT     p   ALTER TABLE ONLY public.user_social_auth
    ADD CONSTRAINT user_social_auth_pkey PRIMARY KEY (id_social_auth);
 P   ALTER TABLE ONLY public.user_social_auth DROP CONSTRAINT user_social_auth_pkey;
       public            postgres    false    223            �           2606    41020 !   user_social user_social_email_key 
   CONSTRAINT     ]   ALTER TABLE ONLY public.user_social
    ADD CONSTRAINT user_social_email_key UNIQUE (email);
 K   ALTER TABLE ONLY public.user_social DROP CONSTRAINT user_social_email_key;
       public            postgres    false    222            �           2606    41022    user_social user_social_pkey 
   CONSTRAINT     _   ALTER TABLE ONLY public.user_social
    ADD CONSTRAINT user_social_pkey PRIMARY KEY (id_user);
 F   ALTER TABLE ONLY public.user_social DROP CONSTRAINT user_social_pkey;
       public            postgres    false    222            �           2606    16399    users users_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id_user);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    215            �           2620    41023 $   users trigger_update_users_updatedat    TRIGGER     �   CREATE TRIGGER trigger_update_users_updatedat BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION public.update_updatedat_column();
 =   DROP TRIGGER trigger_update_users_updatedat ON public.users;
       public          postgres    false    228    215            �           2606    41024    user_social_auth fk_user    FK CONSTRAINT     �   ALTER TABLE ONLY public.user_social_auth
    ADD CONSTRAINT fk_user FOREIGN KEY (id_user) REFERENCES public.users(id_user) ON DELETE CASCADE;
 B   ALTER TABLE ONLY public.user_social_auth DROP CONSTRAINT fk_user;
       public          postgres    false    215    3253    223            [   �  x��T�n�F>��b_@T�/*77�vdDJ��/�ݡ�ɥ����X�hO}� m�C� 9��^�&y�>BgI*r�� H������|�y����s.���
j�x�R�}��D�7*��lh����r%A����)N�P%P��W�Δ1J���D�����)�ɐv*�3T�����4u۴5H=�5�V����7X6zX�R���x#��'|�*)F���Fc��6����?��P5��*û��MK�%
$��������ڢ6�]��(զ��_p(I �P�e��'����w�$�	�q�X��@�B���S��3U�^�?WJ��7؎� �論��-dK�����c)T����5]��cHI���jU������Z	�Xu[����*U�f�/rh �u<�]z&:���:մ��/��=�7�bAJZk����ӆ.��/��yk��g�5;��k������P)�ʱ!R�����W�h��]-8�Rl�
Dcu>�u� )�f|�V$˾��RM�k��և���/
'�?��;�\���ӆ����v���.���a[��yh��hb&r��'"pB_JPf�I�琈�j�lm�΀~�	�����R�KVڎ��z���]m������'G"r�tq�����aq��9���|�l�t����Œd	�<��I0��b?��4��`Y��fwY�)�q<w\O���$���<��<�p>}�iŞ��,͗$[�C����}�	��?�[?�_T��m�����Nc��_���g�"h�ڷ$����0���Sjc�.s�},�j�M���*�~c�(��>�W��nz�`�z����S�[�̬�(� �H�$XW�V+�Q�V�7�ӖQ�ʥ����*J�뵲"�>L�s��sa�!��켇N�T����0#���f�	�"6S�lis$�=��bdg�[��~������G{�W��-��<��|,ϕ���� �Y�Kc���4;-f1�K�NN��,�+���ޑ���LL$�9a
�����Ic����Ke��uK���-�:�k/d����l��*�3/�֛��C�/��_Ͽ�"��T&3�~�8!�YD�;0Ϣ����hX�Elu�zv���}$��ﭼt]�K���0��6�Pĳ\߉��0AB���K1K�s�A�?0_N������}      c   �  x����j�0Ư���DH���l�B�����jP�Xq�],��S�(}��+�i��(�.$t����G�iq�"����M�jbKw]�8'�r��H }񽿫wc���Kl.G߄v���HH������1�*4G�	c�	�Z�@ ��� g�! �QŴ����n�mّ�+��C�;M��ؑo~��a�m}�����������qA�4Rq����z����H�]�������+�gߏ��+Ce؎�o'�_M^n&����=0'���jca��g�gm��G���>���)0�3+��T������4sJ&�M�##�e}��B��q�k%� �y��w Rr�n��*�"�����Q9�)�D<�ڙ�_&�σX��N8p\����8T�}u8��N(�hˌ�?)��oE�      \   �  x�mV�n\G�}�B?������E�p�6�<�FlXN��}��hų��"�w�}�������ӧ����1��6� [m��
�O=�f���/������?=��
$,O�.Y.Iwg*eC<�%M��qNxJ1������ | `�����LyC:"h8�&h/�Z[%A�<1�V�vz �tɴgauݐ� ���u.`i<4AM���:�:-��# �^b�����A���u��b'�^yZW����l_�#��t'�9цzD�n�FfP���,�U��[cW�w,��uW���F��a�U3�$
�b�F���%eY����G�|IyO����v�#���9��X2���@C��o��yW"+��J����f(����4�J�b�cُ ȻgƂ�#@L��e5I�)P����}�樷O���xgD�щ�J��j�@�0�o�f��Wp�5/K{������j� �s"���j��[6H��	f�xTZD�;����dg�Ұщ��m�˂�s<u��2��̒�C8��n.��AÉ��h���B��Z+�>\�X��m\�{��˅�N��6:�hI!��p�PS���1�*���q�G�<O����
����pO��t/�!�9
9{����iRa���p�҃J0�zmM�V����Ϡ � �# ����O��$a��C��@k��E�f�u-SK|;��%�ӥ��':�}F�FX��uuB$��ƨ�����*�!睊�5>��T�ƀL�%���@R�4J�����|�6���0_��^����D�UB�5>?�����C�r�SrJ%���+�S��(g�^����g:*�;_����A͓BQcD=����c�'9"��)�]��L=]�A�6���5SmAZ6�5�sK7����W7���I�ZT���K��R�Z��f�[#��\|������^���&'f�fKZ#�z$�pHۘ�q 5��N�Ƀ��E�MN�`]tL�%rt��e�3�Pl o�g�?�G"Qq���)֨��ԈF�����*z���=S)��u��X\K�7:����Od_�-E"	�/�Y�a�X���ϗo_?�<����/��	�f-�Jg7L����5W[��@q]Wi<y��cݍ����Cq E(��o���Cޭ      Z   �  x��S�jA<�~E��YH�|��`�$�K{��4�����|F��?�I��;{ٙ�ꪮ��a9�`���/�������Ű���P�6�Ҟ��#�ʖs�e��ODק�>�OВ�ʧ�W���i�GU��CRi6��Q��<�K�
�ʵe��$�H؀��	l�XZ�Ѫ���#Vl���ѓ҃끚�i��V�+5���V��/�ܤ �Rs��g#��Ā�y�$Ez�=�$�Iu{��������*CrS!��S���d5�mt-i'V%�\
Èsf�V�m#T�$ʺiy���p��� �}4��(δ$Y��R�b9�pK��V]�nq�#���������>�9��<��pVjgd6��I�+7=x���{dw���������/?��|�e6��˻�j���~1�xX}>�^���cy�m9>N�8��:V      ^   p   x�3���?�8_!83�,�3+?1�!5713G/9?�3������sR9��ML��-,8K�S��SR�S+Rsr�9��Lu�tM��������M,�M�Ȕ ������ H�"�      _      x������ � �      W   3  x�}�Ko�@��5�
n�sFVEK�R���{�� ��kib\�9��<<Wy�$�T碩�裪��"ș�B@ ����PCH#H���@y��3���>�}F��2G��+�[Z8��Nڴ�ô��[r%��d锔����v~��3�@�K��X���X~I���BB�J��Q�tۅ��x�:�k��yDSxt�!�++����ډeZnЧ��-�t�����{L�a,Q�"��tH��pl��V�3����Ω9�̈́1e��o��v\�vcO���z���J�bt����mE��*�%Q �-�n     