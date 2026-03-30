// FilterPanel.tsx
// Komponent med alla filterinputs och uppdaterar filterStore
import { useFilterStore } from '../stores/filterStore';

function FilterPanel() {
  const {
    textFilter,
    regionFilter,
    employmentType,
    requiresExperience,
    setTextFilter,
    setRegionFilter,
    setEmploymentType,
    setRequiresExperience,
    clearFilters,
  } = useFilterStore();

  // Räkna antal aktiva filter (exklusive textFilter)
  const activeFilters = [regionFilter, employmentType, requiresExperience]
    .filter(value => value !== '').length;

  return (
    <div className="filters">
      {/* Fritextsökning */}
      <input
        type="text"
        placeholder="Sök efter jobb..."
        value={textFilter}
        onChange={(e) => setTextFilter(e.target.value)}
      />

      {/* Region */}
      <select
        value={regionFilter}
        onChange={(e) => setRegionFilter(e.target.value)}
      >
        <option value="">Alla regioner</option>
        <option value="Stockholms län">Stockholms län</option>
        <option value="Västra Götalands län">Västra Götalands län</option>
        <option value="Skåne län">Skåne län</option>
        <option value="Uppsala län">Uppsala län</option>
        <option value="Östergötlands län">Östergötlands län</option>
        <option value="Hallands län">Hallands län</option>
        <option value="Jönköpings län">Jönköpings län</option>
        <option value="Dalarnas län">Dalarnas län</option>
        <option value="Södermanlands län">Södermanlands län</option>
      </select>

      {/* Anställningstyp */}
      <select
        value={employmentType}
        onChange={(e) => setEmploymentType(e.target.value)}
      >
        <option value="">Alla anställningstyper</option>
        <option value="Vanlig anställning">Vanlig anställning</option>
        <option value="Behovsanställning">Behovsanställning</option>
        <option value="Sommarjobb">Sommarjobb</option>
      </select>

      {/* Kräver erfarenhet */}
      <select
        value={requiresExperience}
        onChange={(e) => setRequiresExperience(e.target.value)}
      >
        <option value="">Erfarenhet – alla</option>
        <option value="true">Erfarenhet krävs</option>
        <option value="false">Ingen erfarenhet krävs</option>
      </select>

      {/* Rensa-knapp som visas bara om något filter är aktivt */}
      {activeFilters > 0 && (
        <button onClick={clearFilters} className="clear-filters-btn">
          Rensa filter ({activeFilters})
        </button>
      )}
    </div>
  );
}

export default FilterPanel;