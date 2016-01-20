package   
{
	public class SlotAssets
	{

        // Texture Atlases

        [Embed(source="../../assets/atlases/atlas01.png")]
        public static const atlas01:Class;

        [Embed(source="../../assets/atlases/atlas01.xml", mimeType="application/octet-stream")]
        public static const atlas01_xml:Class;

        // Fonts

        [Embed(source="../../assets/fonts/minecraftia.ttf", embedAsCFF="false", fontFamily="Minecraftia")]
        public static const minecraftia_ttf:Class;

	}
}