import Button from "@/components/Button";
import GarmentNameEditor from "@/components/GarmentNameEditor";
import ShirtPuppet from "@/components/puppet/Shirt";
import { IconSparkles } from "@tabler/icons-react";

/** @type {{ [K in GarmentType]: React.FC<PuppetProps<?>> }} */
const Puppets = {
  Shirt: ShirtPuppet,
  Pants: null, // TODO
};

/** @param {{ garment: GarmentInstance }} props */
const GarmentPuppet = (props) => {
  const { garment } = props;

  /** @type {ValueOf<Puppets>} */
  const Puppet = Puppets[garment?.type];

  return (
    <div className="garment-preview">
      <GarmentNameEditor />

      <div className="puppet-box">
        {Puppet && <Puppet specs={garment?.specMap()} />}
      </div>

      <Button
        tint="aquamarine"
        label="Visualize"
        icon={<IconSparkles />}
        width="100%"
      />
    </div>
  );
};

export default GarmentPuppet;
