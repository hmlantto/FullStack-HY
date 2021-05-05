const listHelper = require( '../utils/list_helper' )

const listWithOneBlog = [
  {
    _id: '60915348a541053e60ce7293',
    title: 'Cashmerette Blog',
    author: 'Cashmerette',
    url: 'https://blog.cashmerette.com/',
    likes: 5,
    __v: 0
  }
]

const biggerList = [
  {
    _id: '60915348a541053e60ce7293',
    title: 'Cashmerette Blog',
    author: 'Cashmerette',
    url: 'https://blog.cashmerette.com/',
    likes: 5,
    __v: 0
  },
  {
    _id: '6091539aa541053e60ce7294',
    title: 'Megan Nielsen: The Blog',
    author: 'Megan Nielsen Patterns',
    url: 'https://blog.megannielsen.com/',
    likes: 3,
    __v: 0
  },
  {
    _id: '609153caa541053e60ce7295',
    title: 'Muna and Broad Blog',
    author: 'Muna and Broad',
    url: 'https://www.munaandbroad.com/blogs/news',
    likes: 7,
    __v: 0
  }
]

test( 'dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy( blogs )
  expect( result ).toBe( 1 )
})

describe( 'total likes', () => {
  test( 'of empty list is zero', () => {
    expect( listHelper.totalLikes( []) ).toBe( 0 )
  })

  test( 'when list has only one blog equals the likes of that blog', () => {
    expect( listHelper.totalLikes( listWithOneBlog ) ).toBe( 5 )
  })

  test('of a bigger list is calculated right', () => {
    expect( listHelper.totalLikes( biggerList ) ).toBe( 15 )
  })
})

describe( 'most liked blog', () => {
  test( 'is found correctly', () => {
    expect( listHelper.favoriteBlog( biggerList ) ).toEqual( biggerList[2] )
  })
})