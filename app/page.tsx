import type { Metadata } from "next";
import Link from "next/link";
import { ReservationForm } from "./ReservationForm";

export const metadata: Metadata = {
  title: "Chauffeur privé à Arras | VTC ARRAS HDF",
  description: "Chauffeur privé à Arras pour vos transferts gare, aéroport, déplacements professionnels et événements.",
};

const phone = "0682545849";
const email = "vtcarrashdf@gmail.com";

const services = [
  ["Chauffeur privé", "Vos trajets personnels et professionnels, depuis Arras et dans les Hauts-de-France.", "Ville & région"],
  ["Transferts aéroports", "Une prise en charge calée sur votre voyage, vos bagages et vos horaires.", "Décollage serein"],
  ["Transferts gares", "Départs et arrivées sans attente. Votre chauffeur vous accompagne lorsque le voyage continue.", "À l’heure"],
  ["Événements", "Une solution de transport attentive pour vos rendez-vous, soirées et moments importants.", "Sur mesure"],
];

const faqs = [
  ["Comment réserver un chauffeur VTC à Arras ?", "Appelez-nous ou envoyez votre demande en ligne avec votre départ, destination, date et heure. Nous vous répondons rapidement pour confirmer votre prise en charge."],
  ["Puis-je réserver à l’avance ?", "Oui. La réservation anticipée est recommandée, particulièrement pour les gares, aéroports et événements."],
  ["Êtes-vous disponible la nuit ?", "Les trajets sont assurés 24h/24 sur réservation, selon les disponibilités."],
  ["Assurez-vous les transferts vers les aéroports parisiens ?", "Oui, les transferts depuis Arras vers Lille-Lesquin, Paris Charles-de-Gaulle, Orly et Beauvais peuvent être organisés sur réservation."],
  ["Que se passe-t-il en cas de retard de train ou d’avion ?", "Indiquez votre numéro de train ou de vol à la réservation : nous adaptons la prise en charge aux informations communiquées."],
  ["Puis-je obtenir une facture ?", "Une facture professionnelle peut être fournie sur demande après votre trajet."],
];

export default function Home() {
  return <main>
    <header className="site-header">
      <a className="brand" href="#accueil" aria-label="VTC ARRAS HDF, accueil"><b>VTC</b> ARRAS HDF</a>
      <nav aria-label="Navigation principale"><a href="#services">Services</a><a href="#transferts">Transferts</a><a href="#pro">Entreprises</a><a href="#apropos">À propos</a><a href="#contact">Contact</a></nav>
      <a className="button button-small" href="#reservation">Réserver <i>↗</i></a>
    </header>

    <section className="hero" id="accueil">
      <div className="hero-image" />
      <div className="hero-copy wrap">
        <p className="eyebrow">Chauffeur privé · Arras & Hauts-de-France</p>
        <h1>Le voyage commence<br />avant la destination.</h1>
        <p className="lead">Chauffeur privé à Arras pour vos transferts gares et aéroports, déplacements professionnels, privés et événementiels.</p>
        <div className="hero-actions"><a className="button button-light" href="#reservation">Réserver un trajet <i>↗</i></a><a className="text-link" href={`mailto:${email}?subject=Demande%20de%20devis`}>Demander un devis <i>↗</i></a></div>
        <div className="hero-proof"><a href="#avis" aria-label="Lire les avis clients">★★★★★ <span>Avis clients</span></a><span>Disponible 24h/24 sur réservation</span><span>Arras · Hauts-de-France · Aéroports parisiens</span></div>
      </div>
      <a className="scroll-cue" href="#promesse">Découvrir <span>↓</span></a>
    </section>

    <section className="trust-bar" id="promesse"><div className="wrap"><span>Disponible 24/7 <em>sur réservation</em></span><span>Transferts <em>gares & aéroports</em></span><span>Déplacements <em>professionnels & privés</em></span><a href="#avis">★★★★★ <em>Avis clients</em></a></div></section>

    <section className="intro section wrap" id="apropos">
      <div><p className="eyebrow ink">VTC Arras HDF</p><h2>Le luxe, c’est que tout soit simple.</h2></div>
      <div className="intro-body"><p>De votre réservation à votre arrivée, chaque étape est anticipée pour vous permettre de voyager sereinement. Votre chauffeur vous accompagne avec ponctualité, discrétion et attention.</p><Link prefetch={false} className="text-link dark" href="/a-propos">Découvrir notre approche <i>↗</i></Link></div>
    </section>

    <section className="services section-dark" id="services"><div className="wrap"><div className="section-heading"><p className="eyebrow">Nos services</p><h2>Chaque trajet a son attention particulière.</h2><p>Une prise en charge précise, pensée autour de votre agenda.</p></div><div className="service-grid">{services.map(([title, copy, label], index) => <Link prefetch={false} className={`service-card service-${index + 1}`} href={index === 1 ? "/transfert-aeroport" : index === 2 ? "/transfert-gare" : index === 3 ? "/evenements" : "/chauffeur-prive-arras"} key={title}><div><span>{label}</span><b>0{index + 1}</b></div><h3>{title}</h3><p>{copy}</p><i>↗</i></Link>)}</div></div></section>

    <section className="airport section" id="transferts"><div className="airport-photo" /><div className="airport-copy"><p className="eyebrow ink">Transferts aéroports</p><h2>Votre vol. Votre chauffeur. Aucun stress entre les deux.</h2><p>Nous organisons votre départ ou votre retour en tenant compte de vos horaires et de vos bagages.</p><div className="route-list"><span>Lille-Lesquin</span><span>Paris Charles-de-Gaulle</span><span>Paris-Orly</span><span>Beauvais</span></div><Link prefetch={false} className="text-link dark" href="/transfert-aeroport">Préparer mon transfert <i>↗</i></Link></div></section>

    <section className="vehicle section-dark"><div className="wrap vehicle-grid"><div><p className="eyebrow">À bord · Peugeot 508 GT SW Hybride</p><h2>Un espace pensé pour le trajet.</h2><p className="muted">À bord d’une Peugeot 508 GT SW Hybride de 2021, le confort n’est pas une promesse abstraite : c’est l’espace, le calme et l’attention qui vous permettent d’arriver serein.</p><ul className="features"><li>Peugeot 508 GT SW Hybride</li><li>Modèle 2021</li><li>Climatisation</li><li>Confort arrière</li></ul><p className="fine-print">Pour toute demande concernant les bagages, le nombre de voyageurs ou un équipement particulier, contactez-nous avant la réservation.</p><Link prefetch={false} className="text-link" href="/vehicule">Découvrir le véhicule <i>↗</i></Link></div><div className="vehicle-photo" aria-label="Peugeot 508 GT SW Hybride" /></div></section>

    <section className="chauffeur section wrap"><div className="driver-mark" aria-hidden="true"><span>VTC</span><b>ARRAS</b><i>HDF</i></div><div className="driver-copy"><p className="eyebrow ink">Votre chauffeur</p><h2>Une exigence simple : que votre trajet se déroule parfaitement.</h2><p>Connaissance de la région, conduite souple, discrétion et disponibilité : une présence attentive, sans jamais être intrusive.</p><Link prefetch={false} className="text-link dark" href="/a-propos">En savoir plus <i>↗</i></Link></div></section>

    <section className="reviews section" id="avis"><div className="wrap"><div className="review-title"><p className="eyebrow ink">Avis clients</p><h2>La confiance se construit trajet après trajet.</h2><div className="stars">★★★★★ <span>Votre avis compte</span></div></div><div className="review-grid review-empty"><div><p>Votre expérience de voyage nous aide à maintenir un service attentif, précis et toujours plus simple.</p><a className="text-link dark" href="https://www.google.com/search?q=VTC+ARRAS+HDF+avis" target="_blank" rel="noreferrer">Voir les avis Google <i>↗</i></a></div><div><p>Vous avez voyagé avec nous ? Votre retour compte beaucoup.</p><a className="text-link dark" href={`mailto:${email}?subject=Votre%20avis`}>Laisser un avis <i>↗</i></a></div></div></div></section>

    <section className="pro section-dark" id="pro"><div className="wrap pro-grid"><div><p className="eyebrow">Professionnels</p><h2>Vos déplacements professionnels, sans imprévu.</h2></div><div><p>Un interlocuteur fiable pour vos rendez-vous, vos transferts gare ou aéroport et les déplacements de vos collaborateurs.</p><div className="pro-points"><span>Ponctualité</span><span>Confidentialité</span><span>Réservation anticipée</span><span>Facturation professionnelle</span></div><Link prefetch={false} className="button button-outline" href="/professionnels">Parler de vos besoins <i>↗</i></Link></div></div></section>

    <section className="routes section wrap"><p className="eyebrow ink">Zones desservies</p><div className="routes-heading"><h2>Arras au centre<br />de vos déplacements.</h2><p>Une prise en charge depuis Arras et les Hauts-de-France, pour vos trajets locaux, professionnels ou longue distance.</p></div><div className="route-map"><span className="route-origin">ARRAS</span><i /><span>Paris</span><i /><span>Charles-de-Gaulle</span><i /><span>Lille</span><i /><span>Lille-Lesquin</span></div></section>

    <section className="faq section-dark" id="faq"><div className="wrap faq-grid"><div><p className="eyebrow">Questions fréquentes</p><h2>Ce qu’il faut savoir avant de partir.</h2><p className="muted">Une question plus précise ? Nous sommes là pour vous répondre.</p><Link prefetch={false} className="text-link" href="/faq">Voir toutes les questions <i>↗</i></Link></div><div>{faqs.slice(0, 4).map(([question, answer]) => <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div></div></section>

    <section className="final-cta" id="reservation"><div className="final-overlay" /><div className="wrap final-grid"><div><p className="eyebrow">Réserver votre chauffeur</p><h2>Votre prochain trajet commence ici.</h2><p>Indiquez-nous votre destination. Nous nous occupons du reste.</p><a className="phone-link" href={`tel:+33${phone.slice(1)}`}>06 82 54 58 49 <i>↗</i></a></div><ReservationForm /></div></section>

    <footer id="contact"><div className="wrap footer-grid"><div><a className="brand" href="#accueil"><b>VTC</b> ARRAS HDF</a><p>Chauffeur privé à Arras et dans les Hauts-de-France.</p></div><div><p className="footer-label">Navigation</p><a href="#services">Services</a><a href="#transferts">Transferts</a><a href="#pro">Professionnels</a><a href="#apropos">À propos</a></div><div><p className="footer-label">Contact</p><a href={`tel:+33${phone.slice(1)}`}>06 82 54 58 49</a><a href={`mailto:${email}`}>{email}</a><a href="#reservation">Réserver un trajet</a></div><div><p className="footer-label">Informations</p><Link prefetch={false} href="/contact">Contact & devis</Link><Link prefetch={false} href="/faq">FAQ</Link><Link prefetch={false} href="/mentions-legales">Mentions légales</Link></div></div><div className="wrap footer-bottom"><span>© {new Date().getFullYear()} VTC ARRAS HDF</span><span>Le luxe, c’est que tout soit simple.</span></div></footer>
    <div className="mobile-bar"><a href={`tel:+33${phone.slice(1)}`}>Appeler</a><a href="#reservation">Réserver <i>↗</i></a></div>
  </main>;
}
