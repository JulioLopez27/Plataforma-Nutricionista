import { Card } from './Card'
import { CardHeader } from './CardHeader'
import { CardTitle } from './CardTitle'
import { CardContent } from './CardContent'


export const Recepies_Cards = () => {
  return (
    <main className="container mx-auto px-2 sm:px-4 py-4 sm:py-8 flex justify-center ">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8   ">


        <Card>
          <CardHeader>
            <CardTitle>Spaghetti Bolognese</CardTitle>
          </CardHeader>
          <CardContent>
            <img
              alt="Spaghetti Bolognese"
              className="w-full h-48 object-cover aspect-w-16 aspect-h-9"
              src="/public/img/under_construction.jpg"
           
            />
            <p className="mt-2 sm:mt-4 text-sm sm:text-base">A classic Italian dish with a rich and meaty sauce served over spaghetti.</p>
          </CardContent>
        </Card>



        <Card>
          <CardHeader>
            <CardTitle>Chicken Tikka Masala</CardTitle>
          </CardHeader>
          <CardContent>
            <img
              alt="Chicken Tikka Masala"
              className="w-full h-48 object-cover"
              src="/public/img/under_construction.jpg"
              style={{
                aspectRatio: "200/200",
                objectFit: "cover",
              }}
            />
            <p className="mt-4">A popular Indian dish made with chicken in a creamy, spicy tomato sauce.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Beef Tacos</CardTitle>
          </CardHeader>
          <CardContent>
            <img
              alt="Beef Tacos"
              className="w-full h-48 object-cover"
              src="/public/img/under_construction.jpg"
              style={{
                aspectRatio: "200/200",
                objectFit: "cover",
              }}
            />
            <p className="mt-4">A Mexican dish with beef, lettuce, and cheese served in a crunchy taco shell.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Vegetable Stir Fry</CardTitle>
          </CardHeader>
          <CardContent>
            <img
              alt="Vegetable Stir Fry"
              className="w-full h-48 object-cover"
              src="/public/img/under_construction.jpg"
              style={{
                aspectRatio: "200/200",
                objectFit: "cover",
              }}
            />
            <p className="mt-4">A healthy and colorful dish with a variety of stir-fried vegetables in a savory sauce.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Seafood Paella</CardTitle>
          </CardHeader>
          <CardContent>
            <img
              alt="Seafood Paella"
              className="w-full h-48 object-cover"
              src="/public/img/under_construction.jpg"
              style={{
                aspectRatio: "200/200",
                objectFit: "cover",
              }}
            />
            <p className="mt-4">A traditional Spanish dish with rice, various types of seafood, and a blend of spices.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Chocolate Cake</CardTitle>
          </CardHeader>
          <CardContent>
            <img
              alt="Chocolate Cake"
              className="w-full h-48 object-cover"
              src="/public/img/under_construction.jpg"
              style={{
                aspectRatio: "200/200",
                objectFit: "cover",
              }}
            />
            <p className="mt-4">
              A rich and moist dessert made with dark chocolate and topped with a creamy chocolate frosting.
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
