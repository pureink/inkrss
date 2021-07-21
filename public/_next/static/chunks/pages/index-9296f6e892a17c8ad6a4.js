;(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [405],
    {
        6124: function(t, e, r) {
            'use strict'
            r.r(e),
                r.d(e, {
                    default: function() {
                        return E
                    },
                })
            var n = r(5893),
                s = r(809),
                i = r.n(s),
                o = r(2447),
                c = r(9227),
                a = r(1131),
                l = r(7294),
                u = r(8193),
                h = r(5723),
                d = r(980),
                x = r(8017),
                p = r(5754),
                f = r(4115),
                g = r(3955),
                b = r(6185),
                m = r(3346),
                j = r(7008),
                v = r(9444),
                k = r(9131),
                w = r(4096),
                C = r(2746),
                T = r(3637),
                y = (0, a.cn)(''),
                S = (0, a.cn)(''),
                z = (0, a.cn)('')
            function E() {
                var t = (0, d.useColorMode)(),
                    e = t.colorMode,
                    r = (t.toggleColorMode, (0, d.useToast)()),
                    s = (0, a.KO)(S),
                    E = (0, c.Z)(s, 2),
                    _ = E[0],
                    O = E[1],
                    J = (0, a.KO)(z),
                    N = (0, c.Z)(J, 2),
                    Z = N[0],
                    A = N[1],
                    D = l.useState(!1),
                    G = (0, c.Z)(D, 2),
                    P = G[0],
                    W = G[1],
                    B = (0, a.KO)(y),
                    K = (0, c.Z)(B, 2),
                    M = K[0],
                    R = K[1],
                    F = (0, h.ZP)('https://'.concat(_, '/').concat(Z, '/feeds'))
                        .data
                l.useEffect(
                    function() {
                        O(location.host),
                            A(location.pathname.substring(1)),
                            W(!0)
                    },
                    [O, A]
                )
                var H = (function() {
                        var t = (0, o.Z)(
                            i().mark(function t(e) {
                                var n
                                return i().wrap(function(t) {
                                    for (;;)
                                        switch ((t.prev = t.next)) {
                                            case 0:
                                                return (
                                                    e.preventDefault(),
                                                    (n = e.currentTarget.getAttribute(
                                                        'url'
                                                    )),
                                                    (t.next = 4),
                                                    fetch(
                                                        'https://'
                                                            .concat(_, '/')
                                                            .concat(
                                                                Z,
                                                                '/deleteitem'
                                                            ),
                                                        {
                                                            method: 'post',
                                                            body: JSON.stringify(
                                                                { url: n }
                                                            ),
                                                        }
                                                    )
                                                        .then(function(t) {
                                                            return t.json()
                                                        })
                                                        .then(function(t) {
                                                            0 != t.status
                                                                ? r({
                                                                      position:
                                                                          'bottom-right',
                                                                      title:
                                                                          'Error!',
                                                                      description:
                                                                          t.message,
                                                                      status:
                                                                          'error',
                                                                      duration: 3e3,
                                                                      isClosable: !0,
                                                                  })
                                                                : r({
                                                                      position:
                                                                          'bottom-right',
                                                                      title:
                                                                          'Delete succeed!',
                                                                      description:
                                                                          t.message,
                                                                      status:
                                                                          'success',
                                                                      duration: 1e3,
                                                                      isClosable: !0,
                                                                  })
                                                        })
                                                )
                                            case 4:
                                                t.sent,
                                                    (0, h.JG)(
                                                        'https://'
                                                            .concat(_, '/')
                                                            .concat(Z, '/feeds')
                                                    )
                                            case 6:
                                            case 'end':
                                                return t.stop()
                                        }
                                }, t)
                            })
                        )
                        return function(e) {
                            return t.apply(this, arguments)
                        }
                    })(),
                    I = (function() {
                        var t = (0, o.Z)(
                            i().mark(function t(e) {
                                return i().wrap(function(t) {
                                    for (;;)
                                        switch ((t.prev = t.next)) {
                                            case 0:
                                                return (
                                                    e.preventDefault(),
                                                    (t.next = 3),
                                                    fetch(
                                                        'https://'
                                                            .concat(_, '/')
                                                            .concat(
                                                                Z,
                                                                '/subitem'
                                                            ),
                                                        {
                                                            method: 'post',
                                                            body: JSON.stringify(
                                                                { url: M }
                                                            ),
                                                        }
                                                    )
                                                        .then(function(t) {
                                                            return t.json()
                                                        })
                                                        .then(function(t) {
                                                            0 != t.status
                                                                ? r({
                                                                      position:
                                                                          'bottom-right',
                                                                      title:
                                                                          'Error!',
                                                                      description:
                                                                          t.message,
                                                                      status:
                                                                          'error',
                                                                      duration: 3e3,
                                                                      isClosable: !0,
                                                                  })
                                                                : r({
                                                                      position:
                                                                          'bottom-right',
                                                                      title:
                                                                          'Success!',
                                                                      description:
                                                                          t.message,
                                                                      status:
                                                                          'success',
                                                                      duration: 1e3,
                                                                      isClosable: !0,
                                                                  })
                                                        })
                                                )
                                            case 3:
                                                t.sent,
                                                    (0, h.JG)(
                                                        'https://'
                                                            .concat(_, '/')
                                                            .concat(Z, '/feeds')
                                                    )
                                            case 5:
                                            case 'end':
                                                return t.stop()
                                        }
                                }, t)
                            })
                        )
                        return function(e) {
                            return t.apply(this, arguments)
                        }
                    })(),
                    X = (function() {
                        var t = (0, o.Z)(
                            i().mark(function t(e) {
                                return i().wrap(function(t) {
                                    for (;;)
                                        switch ((t.prev = t.next)) {
                                            case 0:
                                                return (
                                                    e.preventDefault(),
                                                    console.log(
                                                        e.currentTarget.getAttribute(
                                                            'state'
                                                        )
                                                    ),
                                                    (t.next = 4),
                                                    fetch(
                                                        'https://'
                                                            .concat(_, '/')
                                                            .concat(
                                                                Z,
                                                                '/active'
                                                            ),
                                                        {
                                                            method: 'POST',
                                                            body: JSON.stringify(
                                                                {
                                                                    url: e.currentTarget.getAttribute(
                                                                        'url'
                                                                    ),
                                                                    state:
                                                                        'on' !==
                                                                        e.currentTarget.getAttribute(
                                                                            'state'
                                                                        ),
                                                                }
                                                            ),
                                                        }
                                                    )
                                                        .then(function(t) {
                                                            return t.json()
                                                        })
                                                        .then(function(t) {
                                                            0 != t.status
                                                                ? r({
                                                                      position:
                                                                          'bottom-right',
                                                                      title:
                                                                          'Error!',
                                                                      description:
                                                                          t.message,
                                                                      status:
                                                                          'error',
                                                                      duration: 3e3,
                                                                      isClosable: !0,
                                                                  })
                                                                : r({
                                                                      position:
                                                                          'bottom-right',
                                                                      title:
                                                                          'succeed!',
                                                                      description:
                                                                          t.message,
                                                                      status:
                                                                          'success',
                                                                      duration: 1e3,
                                                                      isClosable: !0,
                                                                  })
                                                        })
                                                )
                                            case 4:
                                                t.sent,
                                                    (0, h.JG)(
                                                        'https://'
                                                            .concat(_, '/')
                                                            .concat(Z, '/feeds')
                                                    )
                                            case 6:
                                            case 'end':
                                                return t.stop()
                                        }
                                }, t)
                            })
                        )
                        return function(e) {
                            return t.apply(this, arguments)
                        }
                    })(),
                    L = (function() {
                        var t = (0, o.Z)(
                            i().mark(function t(e) {
                                return i().wrap(function(t) {
                                    for (;;)
                                        switch ((t.prev = t.next)) {
                                            case 0:
                                                return (
                                                    e.preventDefault(),
                                                    console.log(
                                                        e.currentTarget.getAttribute(
                                                            'state'
                                                        )
                                                    ),
                                                    (t.next = 4),
                                                    fetch(
                                                        'https://'
                                                            .concat(_, '/')
                                                            .concat(
                                                                Z,
                                                                '/telegraph'
                                                            ),
                                                        {
                                                            method: 'POST',
                                                            body: JSON.stringify(
                                                                {
                                                                    url: e.currentTarget.getAttribute(
                                                                        'url'
                                                                    ),
                                                                    state:
                                                                        'on' !==
                                                                        e.currentTarget.getAttribute(
                                                                            'state'
                                                                        ),
                                                                }
                                                            ),
                                                        }
                                                    )
                                                        .then(function(t) {
                                                            return t.json()
                                                        })
                                                        .then(function(t) {
                                                            0 != t.status
                                                                ? r({
                                                                      position:
                                                                          'bottom-right',
                                                                      title:
                                                                          'Error!',
                                                                      description:
                                                                          t.message,
                                                                      status:
                                                                          'error',
                                                                      duration: 3e3,
                                                                      isClosable: !0,
                                                                  })
                                                                : r({
                                                                      position:
                                                                          'bottom-right',
                                                                      title:
                                                                          'succeed!',
                                                                      description:
                                                                          t.message,
                                                                      status:
                                                                          'success',
                                                                      duration: 1e3,
                                                                      isClosable: !0,
                                                                  })
                                                        })
                                                )
                                            case 4:
                                                t.sent,
                                                    (0, h.JG)(
                                                        'https://'
                                                            .concat(_, '/')
                                                            .concat(Z, '/feeds')
                                                    )
                                            case 6:
                                            case 'end':
                                                return t.stop()
                                        }
                                }, t)
                            })
                        )
                        return function(e) {
                            return t.apply(this, arguments)
                        }
                    })()
                return F && P
                    ? (0, n.jsxs)(n.Fragment, {
                          children: [
                              (0, n.jsx)(x.xu, {
                                  w: 'md',
                                  maxW: '100%',
                                  mx: 'auto',
                                  my: '10',
                                  children: (0, n.jsxs)(x.xu, {
                                      children: [
                                          (0, n.jsx)(f.x, {
                                              fontSize: '5xl',
                                              fontWeight: 'bold',
                                              align: 'center',
                                              children: 'Sub Lists',
                                          }),
                                          (0, n.jsx)(f.x, {
                                              align: 'center',
                                              fontSize: '2xl',
                                              fontWeight: 'bold',
                                              children: 'Subscribe!',
                                          }),
                                          (0, n.jsxs)(C.B, {
                                              size: 'md',
                                              my: '2',
                                              children: [
                                                  (0, n.jsx)(T.I, {
                                                      focusBorderColor:
                                                          'light' === e
                                                              ? 'black'
                                                              : 'white',
                                                      pr: '4.5rem',
                                                      value: M,
                                                      placeholder: 'Enter Url',
                                                      onChange: function(t) {
                                                          return R(
                                                              t.target.value
                                                          )
                                                      },
                                                  }),
                                                  (0, n.jsx)(g.x, {
                                                      width: '4.5rem',
                                                      children: (0, n.jsx)(
                                                          b.z,
                                                          {
                                                              h: '1.75rem',
                                                              size: 'sm',
                                                              onClick: I,
                                                              variant:
                                                                  'outline',
                                                              colorScheme:
                                                                  'black',
                                                              children:
                                                                  'Subscribe',
                                                          }
                                                      ),
                                                  }),
                                              ],
                                          }),
                                          (0, n.jsxs)(f.x, {
                                              align: 'center',
                                              fontSize: '2xl',
                                              children: [F.length, ' items'],
                                          }),
                                          (0, n.jsxs)(m.iA, {
                                              size: 'xs',
                                              children: [
                                                  (0, n.jsx)(m.hr, {
                                                      children: (0, n.jsxs)(
                                                          m.Tr,
                                                          {
                                                              children: [
                                                                  (0, n.jsx)(
                                                                      m.Th,
                                                                      {
                                                                          children:
                                                                              'active',
                                                                      }
                                                                  ),
                                                                  (0, n.jsx)(
                                                                      m.Th,
                                                                      {
                                                                          children:
                                                                              'title',
                                                                      }
                                                                  ),
                                                                  (0, n.jsx)(
                                                                      j.u,
                                                                      {
                                                                          label:
                                                                              'telegraph',
                                                                          placement:
                                                                              'auto',
                                                                          children: (0,
                                                                          n.jsx)(
                                                                              m.Th,
                                                                              {
                                                                                  children:
                                                                                      'TG',
                                                                              }
                                                                          ),
                                                                      }
                                                                  ),
                                                                  (0, n.jsx)(
                                                                      m.Th,
                                                                      {
                                                                          children:
                                                                              'delete',
                                                                      }
                                                                  ),
                                                              ],
                                                          }
                                                      ),
                                                  }),
                                                  (0, n.jsx)(m.p3, {
                                                      children: F.map(function(
                                                          t
                                                      ) {
                                                          return (0, n.jsxs)(
                                                              m.Tr,
                                                              {
                                                                  children: [
                                                                      (0,
                                                                      n.jsx)(
                                                                          m.Td,
                                                                          {
                                                                              children: (0,
                                                                              n.jsx)(
                                                                                  j.u,
                                                                                  {
                                                                                      label:
                                                                                          'Click to change!',
                                                                                      placement:
                                                                                          'auto',
                                                                                      children: (0,
                                                                                      n.jsx)(
                                                                                          b.z,
                                                                                          {
                                                                                              url:
                                                                                                  t.url,
                                                                                              state: t.active
                                                                                                  ? 'on'
                                                                                                  : 'off',
                                                                                              variant:
                                                                                                  'ghost',
                                                                                              isChecked:
                                                                                                  t.active,
                                                                                              onClick: X,
                                                                                              children: (0,
                                                                                              n.jsx)(
                                                                                                  x.xu,
                                                                                                  {
                                                                                                      w:
                                                                                                          '2',
                                                                                                      h:
                                                                                                          '2',
                                                                                                      border:
                                                                                                          '1px',
                                                                                                      bg: t.active
                                                                                                          ? 'light' ===
                                                                                                            e
                                                                                                              ? 'black'
                                                                                                              : 'white'
                                                                                                          : 'transparent',
                                                                                                      borderRadius:
                                                                                                          'full',
                                                                                                  }
                                                                                              ),
                                                                                          }
                                                                                      ),
                                                                                  }
                                                                              ),
                                                                          }
                                                                      ),
                                                                      (0,
                                                                      n.jsx)(
                                                                          m.Td,
                                                                          {
                                                                              children: (0,
                                                                              n.jsx)(
                                                                                  v.r,
                                                                                  {
                                                                                      href:
                                                                                          t.url,
                                                                                      children:
                                                                                          t.title,
                                                                                  }
                                                                              ),
                                                                          }
                                                                      ),
                                                                      (0,
                                                                      n.jsx)(
                                                                          m.Td,
                                                                          {
                                                                              children: (0,
                                                                              n.jsx)(
                                                                                  j.u,
                                                                                  {
                                                                                      label:
                                                                                          'Click to change!',
                                                                                      placement:
                                                                                          'auto',
                                                                                      children: (0,
                                                                                      n.jsx)(
                                                                                          b.z,
                                                                                          {
                                                                                              url:
                                                                                                  t.url,
                                                                                              state: t.telegraph
                                                                                                  ? 'on'
                                                                                                  : 'off',
                                                                                              variant:
                                                                                                  'ghost',
                                                                                              isChecked:
                                                                                                  t.telegraph,
                                                                                              onClick: L,
                                                                                              children: (0,
                                                                                              n.jsx)(
                                                                                                  x.xu,
                                                                                                  {
                                                                                                      w:
                                                                                                          '2',
                                                                                                      h:
                                                                                                          '2',
                                                                                                      border:
                                                                                                          '1px',
                                                                                                      bg: t.telegraph
                                                                                                          ? 'light' ===
                                                                                                            e
                                                                                                              ? 'black'
                                                                                                              : 'white'
                                                                                                          : 'transparent',
                                                                                                      borderRadius:
                                                                                                          'full',
                                                                                                  }
                                                                                              ),
                                                                                          }
                                                                                      ),
                                                                                  }
                                                                              ),
                                                                          }
                                                                      ),
                                                                      (0,
                                                                      n.jsx)(
                                                                          m.Td,
                                                                          {
                                                                              children: (0,
                                                                              n.jsxs)(
                                                                                  k.J2,
                                                                                  {
                                                                                      placement:
                                                                                          'top-start',
                                                                                      colorScheme:
                                                                                          'black',
                                                                                      children: [
                                                                                          (0,
                                                                                          n.jsx)(
                                                                                              k.xo,
                                                                                              {
                                                                                                  children: (0,
                                                                                                  n.jsx)(
                                                                                                      b.z,
                                                                                                      {
                                                                                                          variant:
                                                                                                              'ghost',
                                                                                                          size:
                                                                                                              'sm',
                                                                                                          children:
                                                                                                              'Delete',
                                                                                                      }
                                                                                                  ),
                                                                                              }
                                                                                          ),
                                                                                          (0,
                                                                                          n.jsxs)(
                                                                                              k.yk,
                                                                                              {
                                                                                                  boxShadow:
                                                                                                      'black',
                                                                                                  children: [
                                                                                                      (0,
                                                                                                      n.jsx)(
                                                                                                          k.Yt,
                                                                                                          {
                                                                                                              fontWeight:
                                                                                                                  'semibold',
                                                                                                              children:
                                                                                                                  'Be careful!',
                                                                                                          }
                                                                                                      ),
                                                                                                      (0,
                                                                                                      n.jsx)(
                                                                                                          k.QH,
                                                                                                          {}
                                                                                                      ),
                                                                                                      (0,
                                                                                                      n.jsx)(
                                                                                                          k.us,
                                                                                                          {}
                                                                                                      ),
                                                                                                      (0,
                                                                                                      n.jsxs)(
                                                                                                          k.b,
                                                                                                          {
                                                                                                              align:
                                                                                                                  'center',
                                                                                                              children: [
                                                                                                                  (0,
                                                                                                                  n.jsx)(
                                                                                                                      f.x,
                                                                                                                      {
                                                                                                                          children:
                                                                                                                              'Delete ' +
                                                                                                                              t.title +
                                                                                                                              ' ?',
                                                                                                                      }
                                                                                                                  ),
                                                                                                                  (0,
                                                                                                                  n.jsx)(
                                                                                                                      b.z,
                                                                                                                      {
                                                                                                                          my:
                                                                                                                              '2',
                                                                                                                          variant:
                                                                                                                              'outline',
                                                                                                                          size:
                                                                                                                              'sm',
                                                                                                                          borderColor:
                                                                                                                              'black',
                                                                                                                          url:
                                                                                                                              t.url,
                                                                                                                          onClick: H,
                                                                                                                          children:
                                                                                                                              'Confirm!',
                                                                                                                      }
                                                                                                                  ),
                                                                                                              ],
                                                                                                          }
                                                                                                      ),
                                                                                                  ],
                                                                                              }
                                                                                          ),
                                                                                      ],
                                                                                  }
                                                                              ),
                                                                          }
                                                                      ),
                                                                  ],
                                                              },
                                                              t.title
                                                          )
                                                      }),
                                                  }),
                                              ],
                                          }),
                                      ],
                                  }),
                              }),
                              (0, n.jsx)('footer', {
                                  children: (0, n.jsx)(w.k, {
                                      mt: '100px',
                                      borderTop: '1px',
                                      mx: 'auto',
                                      justify: 'flex-end',
                                      px: 8,
                                      py: 4,
                                      width: '100%',
                                      maxWidth: 'md',
                                      children: (0, n.jsx)(v.r, {
                                          href:
                                              'https://github.com/pureink/inkrss',
                                          isExternal: !0,
                                          children: (0, n.jsx)(b.z, {
                                              variant: 'ghost',
                                              size: 'sm',
                                              rightIcon: (0, n.jsx)(u.RrF, {}),
                                              children: 'GitHub',
                                          }),
                                      }),
                                  }),
                              }),
                          ],
                      })
                    : (0, n.jsx)(x.xu, {
                          w: '100%',
                          align: 'center',
                          children: (0, n.jsx)(p.$, { size: 'xl', my: '80' }),
                      })
            }
        },
        8581: function(t, e, r) {
            ;(window.__NEXT_P = window.__NEXT_P || []).push([
                '/',
                function() {
                    return r(6124)
                },
            ])
        },
    },
    function(t) {
        t.O(0, [774, 617, 435, 888, 179], function() {
            return (e = 8581), t((t.s = e))
            var e
        })
        var e = t.O()
        _N_E = e
    },
])
