package   
{
	public class SlotAssets
	{

        // Texture Atlases

        [Embed(source="../assets/atlases/sheet.png")]
        public static const sheet:Class;

        [Embed(source="../assets/atlases/data.xml", mimeType="application/octet-stream")]
        public static const data:Class;

        // Fonts

        [Embed(source="../assets/fonts/minecraftia.ttf", embedAsCFF="false", fontFamily="Minecraftia")]
        public static const makisupa:Class;

	}
}