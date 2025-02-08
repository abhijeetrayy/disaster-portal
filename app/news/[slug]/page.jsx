const NewsPage = async({params}) => {
    const {slug} = await params;
    console.log(slug);
    const news = 
        {
          title: "Severe Floods in Southern India",
          date: "February 6, 2025",
          summary:
            "Heavy rainfall has led to severe flooding in several southern regions of India, with many areas submerged.",
            article: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Animi quam consequatur qui placeat, aspernatur earum voluptate illum deserunt optio voluptates blanditiis quos, quas sit eaque rerum. At nemo totam itaque aliquam earum animi vero eum vel. Repellendus, eius cum. Earum aspernatur ut asperiores, deserunt quam eveniet? Cupiditate, alias nostrum molestiae quia vitae rerum facilis debitis dolorum odit dolores. Facere, ad perspiciatis. Ipsa excepturi officiis cumque vel in inventore optio, natus ipsam temporibus ab repellat. Laboriosam, sequi, laudantium culpa beatae eum corporis distinctio quis, velit saepe alias doloribus totam deleniti consequuntur? Expedita consectetur similique id animi odio in esse dicta vitae?",
            editor: "John Bhai",
            updateTime: "10:00 AM "
        }
    return (
        <div className="container mx-auto p-4 bg-white text-gray-800">
            <section className="mb-8">
                <h1 className="text-4xl font-bold mb-4">{news.title}</h1>
                <p className="text-sm text-gray-600 mt-4">Edited by: {news.editor}</p>
                <p className="text-sm text-gray-600">Last updated: {news.updateTime}</p>
                <p className="text-lg mb-4">{news.summary}</p>
                <article className="prose lg:prose-xl">{news.article}</article>
            </section>
            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-2">Emergency Helpline</h2>
                <p className="text-lg">For emergencies, please call: <span className="font-bold">123-456-7890</span></p>
            </section>
            <section>
                <h2 className="text-2xl font-semibold mb-2">Nearby Hospitals</h2>
                <ul className="list-disc list-inside">
                    <li className="mb-2">Hospital A - 123 Main St, City</li>
                    <li className="mb-2">Hospital B - 456 Elm St, City</li>
                    <li className="mb-2">Hospital C - 789 Oak St, City</li>
                </ul>
            </section>
        </div>
    );
};

export default NewsPage;